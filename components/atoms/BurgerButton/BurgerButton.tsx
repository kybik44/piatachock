import React from "react";
import styles from "./BurgerButton.module.css";
import BurgerIcon from "/icons/BurgerIcon";
import CloseIcon from "/icons/CloseIcon";

interface BurgerButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

const BurgerButton: React.FC<BurgerButtonProps> = ({ onClick, isOpen }) => {
  return (
    <button className={styles.burgerButton} onClick={onClick}>
      {!isOpen ? (
        <BurgerIcon className={styles.burgerIcon} />
      ) : (
        <CloseIcon className={styles.closeIcon} />
      )}
    </button>
  );
};

export default BurgerButton;
