import React from "react";
import styles from "./Button.module.css";
import Text from "/components/atoms/Text/Text";
import ArrowIcon from "/icons/ArrowIcon";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  icon?: boolean;
  redButton?: boolean;
  className?: string;
  textClassName?: string;
  type?: "button" | "submit" | "reset" | undefined;
  isTransparent?: boolean;
  isBack?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  icon = false,
  className = "",
  textClassName = "",
  onClick,
  type,
  isTransparent,
  isBack = false,
}) => {
  const buttonClassName = `
    ${className} 
    ${styles.button}
    ${icon ? styles.withIcon : ""}
    ${isBack ? styles.back : ""}
    ${isTransparent ? styles.transparent : ""}`;
  const textVariant = "button";
  const textClasses = `${styles.buttonText} ${textClassName}`;

  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {isBack && (
        <div className={`${styles.buttonIcon} ${isBack && styles.backIcon}`}>
          <ArrowIcon className={styles.icon} />
        </div>
      )}
      <Text variant={textVariant} className={textClasses}>
        {label}
      </Text>
      {icon && !isBack && (
        <div className={styles.buttonIcon}>
          <ArrowIcon className={styles.icon} />
        </div>
      )}
    </button>
  );
};
export default Button;
