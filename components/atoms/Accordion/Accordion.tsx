import React, { useState, FC, ReactNode, useRef, useEffect } from "react";
import styles from "./Accordion.module.css";
import Text from "/components/atoms/Text/Text";
import ArrowIcon from "/icons/ArrowIcon";

interface AccordionProps {
  title: string;
  children: ReactNode;
  isOpenDefault?: boolean;
  onClick?: () => void;
}

const Accordion: FC<AccordionProps> = ({
  title,
  children,
  isOpenDefault = false,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      contentRef.current.style.maxHeight = isOpen
        ? `${contentHeight}px`
        : "0px";
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen((prevState) => !prevState);
    onClick?.();
  };

  const iconClassName = `${styles.icon} ${isOpen && styles.open}`;
  const titleClassName = `${styles.title} ${isOpen ? styles.open : ""}`;
  const accordionClassName = `${styles.accordion} ${isOpen ? styles.open : ""}`;
  const contentClassName = `${styles.content} ${isOpen ? styles.open : ""}`;

  return (
    <div className={accordionClassName}>
      <div className={styles.header} onClick={toggleAccordion}>
        <Text variant="body5" className={titleClassName}>
          {title}
        </Text>
        <div className={iconClassName}>
          <ArrowIcon />
        </div>
      </div>
      <div
        ref={contentRef}
        className={contentClassName}
        style={{
          transition: "max-height 0.3s ease-out",
          overflow: "hidden",
        }}
      >
        <Text variant="body6" className={styles.innerContent}>
          {children}
        </Text>
      </div>
    </div>
  );
};
export default Accordion;
