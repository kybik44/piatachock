import React from "react";
import Link from "next/link";
import styles from "./CallBlock.module.css";
import Button from "/components/atoms/Button/Button";
import Text from "/components/atoms/Text/Text";
import { usePopup } from "/context/PopupContext";
import useMediaQuery from "/hooks/useMediaQuery";
import ContactPopup from "../ContactPopup/ContactPopup";

interface ICallBlock {
  isFooter?: boolean;
  phoneClassName?: string;
  phoneNumber?: string;
  onRequestClick?: () => void;
}

const CallBlock: React.FC<ICallBlock> = ({
  isFooter = false,
  phoneClassName,
  phoneNumber = "+375 (29) 643-15-97",
  onRequestClick,
}) => {
  const isTablet = useMediaQuery("(max-width: 991px)");
  const { openPopup } = usePopup();

  const containerClassName = isFooter
    ? styles.footerContactInfo
    : isTablet
    ? styles.contactInfoMobile
    : styles.contactInfo;

  const phoneNumberVariant = isFooter ? "h3" : "subtitle1";
  const showCallBlock = (isFooter && !isTablet) || !isFooter;

  const handleClick = () => {
    if (onRequestClick) {
      onRequestClick();
    } else {
      openPopup(<ContactPopup />);
    }
  };

  if (!showCallBlock) return null;

  return (
    <div className={containerClassName}>
      <Link
        href={`tel:${phoneNumber.replace(/\s+/g, "")}`}
        className={styles.phoneLink}
      >
        <Text
          variant={phoneNumberVariant}
          className={`${styles.phoneNumber} ${phoneClassName}`}
          fontWeight={500}
        >
          {phoneNumber}
        </Text>
      </Link>

      {!isFooter &&
        (!isTablet ? (
          <Button label="Отправить" onClick={handleClick} />
        ) : (
          <Button
            label="Оставить заявку"
            onClick={handleClick}
            className={styles.button}
          />
        ))}
    </div>
  );
};

export default CallBlock;
