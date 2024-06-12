import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import { fetchProductById } from "/api/wordpressApi";
import Text from "/components/atoms/Text/Text";
import { useImageContext } from "/context/ImageContext";
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
  const { loadedImages, addImage } = useImageContext();
  const [productCache, setProductCache] = useState<Record<number, any>>({});
  const [cachedImageUrl, setCachedImageUrl] = useState(image || noneImage);
  const router = useRouter();

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

      if (isCatalogProduct) {
        router.push(
          `/catalog?category=${productCategory}${
            router.query.page ? `&page=${router.query.page}` : ""
          }&product=${id}`,
          undefined,
          { shallow: true }
        );
      }

      openPopup(<ProductInfoCard cardInfo={cardInfo} />);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  }, [id, productCache, openPopup, isCatalogProduct, productCategory, router]);

  const handleClickContact = useCallback(() => {
    openPopup(<ContactPopup />);
  }, [openPopup]);

  const imageUrl = image || noneImage;

  useEffect(() => {
    if (!loadedImages.has(imageUrl)) {
      addImage(imageUrl);
    } else {
      setCachedImageUrl(loadedImages.get(imageUrl)!);
    }
  }, [imageUrl, loadedImages, addImage]);

  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <Image
          src={cachedImageUrl}
          alt={title}
          className={styles.cardImage}
          width={500}
          height={500}
          objectFit="cover"
          quality={100}
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
