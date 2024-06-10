import React, { useEffect } from "react";
import { usePopup } from "/context/PopupContext";
import styles from "./Popup.module.css";
import Loading from "/components/atoms/Loading/Loading";

const Popup: React.FC = () => {
  const { isOpen, closePopup, content, isLoader } = usePopup();

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  useEffect(() => {
    const setOverlayHeight = () => {
      const overlay = document.querySelector(`.${styles.overlay}`);
      if (overlay) {
        overlay.setAttribute("style", `height: ${window.innerHeight}px;`);
      }
    };

    if (isOpen) {
      setOverlayHeight();
      window.addEventListener("resize", setOverlayHeight);
    }

    return () => {
      window.removeEventListener("resize", setOverlayHeight);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.popupContent}>
        {!isLoader && (
          <button className={styles.closeButton} onClick={closePopup}>
            ×
          </button>
        )}
        {content ? content : <Loading />}
      </div>
    </div>
  );
};

export default Popup;
