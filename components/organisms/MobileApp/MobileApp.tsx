import React from "react";
import styles from "./MobileApp.module.css";
import Button from "/components/atoms/Button/Button";
import Text from "/components/atoms/Text/Text";
import useMediaQuery from "/hooks/useMediaQuery";
import Image from "next/image";
import { IMobileAppData } from "/api/wordpressApi";

interface IMobileAppProps {
  mobileAppData: IMobileAppData;
}

const MobileApp: React.FC<IMobileAppProps> = ({ mobileAppData }) => {
  const isTablet = useMediaQuery("(max-width:991px)");
  return (
    <section className={styles.mobileApp}>
      <div className={styles.content}>
        <div className={styles.info}>
          <Text
            variant="h2"
            color={isTablet ? "#472115" : "#B43131"}
            className={styles.title}
          >
            {mobileAppData?.title}
          </Text>
          <Text variant="subtitle1" className={styles.subtitle}>
            {mobileAppData?.text}
          </Text>
          <div className={styles.buttonGroup}>
            <Button
              label="Android"
              onClick={() =>
                window.open(
                  "https://play.google.com/store/apps/details?id=com.foodpicasso.pigletterritory",
                  "_blank"
                )
              }
              className={styles.button}
            />
            <Button
              label="iOS"
              onClick={() =>
                window.open(
                  "https://apps.apple.com/by/app/%D1%82%D0%B5%D1%80%D1%80%D0%B8%D1%82%D0%BE%D1%80%D0%B8%D1%8F-%D0%BF%D1%8F%D1%82%D0%B0%D1%87%D0%BE%D0%BA-%D0%B1%D0%B0%D1%80%D0%B0%D0%BD%D0%BE%D0%B2%D0%B8%D1%87%D0%B8/id1513320131",
                  "_blank"
                )
              }
              className={styles.button}
            />
          </div>
        </div>
        {isTablet && (
          <Image
            src={mobileAppData?.photo1}
            alt="Mobile app visual"
            className={styles.image}
            width={500}
            height={500}
          />
        )}
      </div>
      {!isTablet && (
        <Image
          src={mobileAppData?.photo1}
          alt="Mobile app visual"
          className={styles.image}
          width={500}
          height={500}
        />
      )}
    </section>
  );
};

export default MobileApp;
