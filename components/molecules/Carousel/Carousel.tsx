import {
  Splide,
  SplideSlide,
  Splide as SplideType,
} from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import React, { useEffect, useRef } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import styles from "./Carousel.module.css";
import useMediaQuery from "/hooks/useMediaQuery";
interface CarouselProps {
  items: Array<{ id: number | string; content: React.ReactNode }>;
  perPageDesktop?: number;
  perPageTablet?: number;
  perPageMobile?: number;
  isMainPage?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  perPageDesktop = 3,
  perPageTablet = 2,
  perPageMobile = 1,
  isMainPage = true,
}) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const splideRef = useRef<SplideType>(null);

  const perPage = isDesktop
    ? perPageDesktop
    : isTablet
    ? perPageTablet
    : perPageMobile;

  const handleAutoScroll = () => {
    const splideInstance = splideRef.current?.splide;

    if (splideInstance && splideInstance.Components) {
      if (isMobile) {
        splideInstance.mount({ AutoScroll });
      } else {
        const autoScroll = splideInstance.Components.AutoScroll;
        if (typeof autoScroll === "object" && autoScroll.destroy) {
          autoScroll.destroy();
        }
      }
    }
  };
  useEffect(() => {
    const splideInstance = splideRef.current?.splide;

    if (splideInstance) {
      splideInstance.on("mounted", handleAutoScroll);
      return () => {
        splideInstance.off("mounted");
      };
    }
  }, []);

  const handleClickPrev = () => {
    splideRef.current?.splide?.go("<");
  };

  const handleClickNext = () => {
    splideRef.current?.splide?.go(">");
  };

  return (
    <section
      className={`${styles.carouselContainer} ${
        isMainPage ? "mainSplide" : ""
      }`}
    >
      <Splide
        options={{
          type: "loop",
          arrows: false,
          perPage: perPage,
          focus: 0,
          gap: isMobile ? "8px" : "20px",
          pagination: false,
          autoScroll: isMobile
            ? {
                speed: 1,
                pauseOnHover: true,
                pauseOnFocus: true,
                rewind: true,
              }
            : undefined,
        }}
        extensions={isMobile ? { AutoScroll } : undefined}
        ref={splideRef}
        className={isMainPage ? styles.splide : styles.reviewsSplide}
      >
        {items.map((item) => (
          <SplideSlide key={item.id} className={styles.slide}>
            {item.content}
          </SplideSlide>
        ))}
      </Splide>
      {!isMobile && (
        <div
          className={`${styles.navButtons} ${isMainPage && styles.flyButtons}`}
        >
          <button
            className={styles.navButton}
            onClick={handleClickPrev}
            aria-label="Previous"
          >
            <SlArrowLeft />
          </button>
          <button
            className={styles.navButton}
            onClick={handleClickNext}
            aria-label="Next"
          >
            <SlArrowRight />
          </button>
        </div>
      )}
    </section>
  );
};

export default Carousel;
