import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./CatalogItem.module.css";
import Text from "/components/atoms/Text/Text";

interface CatalogItemProps {
  imageSrc: string | StaticImageData;
  name: string;
  onClick: () => void;
}

const CatalogItem: FC<CatalogItemProps> = ({ imageSrc, name, onClick }) => {
  return (
    <div className={styles.catalogItem} onClick={onClick}>
      <Image
        src={imageSrc}
        alt={name}
        className={styles.catalogItemImage}
        width={300}
        height={300}
        quality={100}
      />
      <div className={styles.catalogItemOverlay}>
        <Text variant="h6" className={styles.catalogItemText}>
          {name}
        </Text>
      </div>
    </div>
  );
};

export default CatalogItem;
