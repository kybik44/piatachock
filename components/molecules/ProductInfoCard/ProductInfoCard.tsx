import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useCallback } from "react";
import styles from "./ProductInfoCard.module.css";
import Text from "/components/atoms/Text/Text";
import { usePopup } from "/context/PopupContext";
import { noneImage } from "/utils/constants";

const Button = dynamic(() => import("/components/atoms/Button/Button"), {
  ssr: false,
});
const ContactPopup = dynamic(
  () => import("/components/molecules/ContactPopup/ContactPopup"),
  { ssr: false }
);

interface ICardInfo {
  image: string | null;
  title: string;
  category: string | null;
  weight: string | null;
  description: string;
  attributes: {
    id: number;
    slug: string;
    options: string[];
  }[];
}

interface ICardProps {
  cardInfo: ICardInfo;
}

const ProductInfoCard: React.FC<ICardProps> = ({ cardInfo }) => {
  const { openPopup } = usePopup();

  const handleClickContact = useCallback(() => {
    openPopup(<ContactPopup />);
  }, [openPopup]);

  return (
    <div className={styles.card}>
      <Image
        src={cardInfo.image || noneImage}
        className={styles.cardImage}
        alt="Product Image"
        width={400}
        height={400}
        layout="responsive"
        objectFit="contain"
      />
      <div className={styles.cardInfoContainer}>
        <div className={styles.cardInfoHead}>
          <Text
            variant="productTitle"
            fontWeight={700}
            className={styles.title}
          >
            {cardInfo.title}
          </Text>
          {(cardInfo.category || cardInfo.weight) && (
            <div className={styles.characteristics}>
              <Text variant="body2" className={styles.cardInfoCategory}>
                {cardInfo.category} / {cardInfo.weight}
              </Text>
            </div>
          )}
          {cardInfo.description && (
            <>
              <Text
                variant="h5"
                fontWeight={700}
                className={styles.descriptionTitle}
              >
                О продукте
              </Text>
              <Text
                variant="card"
                className={styles.description}
                html={cardInfo.description}
              />
            </>
          )}
        </div>
        {cardInfo.attributes.length > 0 && (
          <div className={styles.details}>
            <Text
              variant="card"
              fontWeight={700}
              className={styles.detailsTitle}
            >
              Пищевая ценность на 100 г
            </Text>
            {cardInfo.attributes.map((item) => (
              <div className={styles.detailsRow} key={item.id}>
                <Text variant="card" className={styles.detailsItemTitle}>
                  {item.slug}
                </Text>
                <Text
                  variant="card"
                  fontWeight={700}
                  className={styles.detailsItemValue}
                >
                  {item.options.join(", ")}
                </Text>
              </div>
            ))}
          </div>
        )}
        <Button
          label="Заказать"
          onClick={handleClickContact}
          className={styles.button}
          isTransparent
        />
      </div>
    </div>
  );
};

export default ProductInfoCard;
