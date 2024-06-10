import React, { useCallback } from "react";
import styles from "./ShopCard.module.css";
import Button from "/components/atoms/Button/Button";
import Text from "/components/atoms/Text/Text";
import Image from "next/image";
import { noneImage } from "/utils/constants";

interface ShopCardProps {
  image: string;
  city: string;
  district: string;
  address: string;
  workingHours: string;
  weekendHours: string;
  coordinates: string;
  onShopSelect: (coordinates: [number, number], city: string) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({
  image,
  city,
  district,
  address,
  workingHours,
  weekendHours,
  coordinates,
  onShopSelect,
}) => {
  const handleClick = useCallback(() => {
    const [lat, lon] = coordinates.split(",").map(Number);
    onShopSelect([lat, lon], city);
  }, [coordinates, city, onShopSelect]);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Text variant="body1" className={styles.location} html={city} />
        <Image
          src={image || noneImage}
          alt={address}
          className={styles.cardImage}
          width={400}
          height={400}
        />
      </div>

      <div className={styles.cardInfo}>
        <div className={styles.addressContainer}>
          <Text variant="body1" color={"#1b1b1b"} className={styles.district}>
            {district}
          </Text>
          <Text
            variant="h4"
            color={"#1b1b1b"}
            fontWeight={700}
            className={styles.address}
            html={address}
          />
        </div>

        <Text
          variant="body1"
          color={"#1b1b1b"}
          className={styles.workingHours}
          html={workingHours}
        />

        {weekendHours && (
          <Text
            variant="body1"
            color={"#1b1b1b"}
            className={styles.weekendHours}
            html={weekendHours}
          />
        )}
        <Button
          label={"Посмотреть на карте"}
          onClick={handleClick}
          className={styles.button}
          isTransparent
        />
      </div>
    </div>
  );
};

export default ShopCard;
