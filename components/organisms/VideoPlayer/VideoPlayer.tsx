import React, { useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css";
import VideoPlayIcon from "/icons/VideoPlayIcon";
import VideoPauseIcon from "/icons/VideoPauseIcon";

const VideoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const userInteractedRef = useRef(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (!userInteractedRef.current) {
        if (entry.isIntersecting) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      }
    });
  };

  useEffect(() => {
    if (playerContainerRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
      });

      observerRef.current.observe(playerContainerRef.current);
    }

    return () => {
      if (observerRef.current && playerContainerRef.current) {
        observerRef.current.unobserve(playerContainerRef.current);
      }
    };
  }, []);

  const handlePlayerClick = () => {
    setIsPlaying((prev) => !prev);
    userInteractedRef.current = true;
  };

  const handleControlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handlePlayerClick();
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <section
      className={styles.videoPlayerContainer}
      ref={playerContainerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlayerClick}
    >
      <ReactPlayer
        url="https://admin-piatachok.by/wp-content/uploads/2024/05/IMG_7702.mp4"
        width="100%"
        height="100%"
        playing={!isMobile && isPlaying}
        muted={true}
        className={styles.reactPlayer}
        controls
        onPlay={handlePlay}
        onPause={handlePause}
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
      />

      {!isMobile && (
        <button
          className={`${styles.videoPlayerPlayButton} ${
            isPlaying ? styles.playing : ""
          } ${isHovered ? styles.hovered : ""}`}
          onClick={handleControlClick}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <VideoPauseIcon /> : <VideoPlayIcon />}
        </button>
      )}
    </section>
  );
};

export default VideoPlayer;
