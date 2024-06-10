import React, { useCallback, useEffect, useState } from "react";
import styles from "./ScrollToTop.module.css";
import Text from "/components/atoms/Text/Text";
import useMediaQuery from "/hooks/useMediaQuery";
import ArrowToTopIcon from "/icons/ArrowToTopIcon";
const ScrollToTop: React.FC = () => {
  const isMobile = useMediaQuery("(min-width:640px)");
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button className={styles.scrollTop} onClick={handleScrollToTop}>
          {isMobile && <Text variant="body1">Наверх</Text>}
          <ArrowToTopIcon className={styles.icon} />
        </button>
      )}
    </>
  );
};

export default React.memo(ScrollToTop);
