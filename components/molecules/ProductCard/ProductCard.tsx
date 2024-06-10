import Image from "next/image";
import React, { useCallback, useState } from "react";
import router, { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styles from "./ProductCard.module.css";
import { fetchProductById } from "/api/wordpressApi";
import Text from "/components/atoms/Text/Text";
import { usePopup } from "/context/PopupContext";
import { noneImage } from "/utils/constants";

const Loading = dynamic(() => import("/components/atoms/Loading/Loading"), {
  ssr: false,
});
const ContactPopup = dynamic(
  () => import("/components/molecules/ContactPopup/ContactPopup"),
  { ssr: false }
);
const ProductInfoCard = dynamic(
  () => import("/components/molecules/ProductInfoCard/ProductInfoCard"),
  { ssr: false }
);
const Button = dynamic(() => import("/components/atoms/Button/Button"), {
  ssr: false,
});

interface ICardProps {
  id: number;
  image: string | null;
  title: string;
  category: string | null;
  weight: string | null;
  productCategory?: string;
  isCatalogProduct?: boolean;
}

const ProductCard: React.FC<ICardProps> = ({
  id,
  image,
  title,
  category,
  weight,
  productCategory,
  isCatalogProduct,
}) => {
  const { openPopup } = usePopup();
  const [productCache, setProductCache] = useState<Record<number, any>>({});

  const handleClickMore = useCallback(async () => {
    openPopup(<Loading />, true);

    if (productCache[id]) {
      openPopup(<ProductInfoCard cardInfo={productCache[id]} />);
      return;
    }

    try {
      const productDetails = await fetchProductById(id);
      const cardInfo = {
        image: productDetails.acf.photo,
        title: productDetails.name,
        category: productDetails.acf.type,
        weight: productDetails.acf.weight,
        description: productDetails.description,
        attributes: productDetails.attributes,
      };

      setProductCache((prevCache) => ({
        ...prevCache,
        [id]: cardInfo,
      }));

      isCatalogProduct &&
        router.push(
          `/catalog?category=${productCategory}${
            router.query.page ? `&page=${router.query.page}` : ""
          }&product=${id}`,
          undefined,
          { shallow: true }
        );

      openPopup(<ProductInfoCard cardInfo={cardInfo} />);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  }, [id, productCache, openPopup]);

  const handleClickContact = useCallback(() => {
    openPopup(<ContactPopup />);
  }, [openPopup]);

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <Image
          src={image || noneImage}
          alt={title}
          className={styles.cardImage}
          width={300}
          height={300}
          objectFit="cover"
        />
      </div>
      <div className={styles.cardInfoContainer}>
        <div className={styles.cardInfo}>
          <div className={styles.cardInfoNames}>
            <Text variant="body3" className={styles.cardInfoTitle}>
              {title}
            </Text>
            {category && (
              <Text variant="h5" className={styles.cardInfoCategory}>
                {category}
              </Text>
            )}
          </div>
          {weight && (
            <Text variant="h4" className={styles.cardInfoWeight}>
              {weight}
            </Text>
          )}
        </div>
        <div className={styles.buttonsRow}>
          <Button
            label="Подробнее"
            onClick={handleClickMore}
            className={styles.button}
            isTransparent
          />
          {isCatalogProduct && (
            <Button
              label="Заказать"
              onClick={handleClickContact}
              className={`${styles.button} ${styles.catalogButton}`}
              isTransparent
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
