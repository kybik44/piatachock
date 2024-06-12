import dynamic from "next/dynamic";
import router from "next/router";
import React, { Suspense, useCallback, useMemo, useEffect } from "react";
import styles from "./Catalog.module.css";
import { IProduct, IProductCategory } from "/api/wordpressApi";
import Loading from "/components/atoms/Loading/Loading";
import Placeholder from "/components/atoms/Placeholder/Placeholder";
import { noneImage } from "/utils/constants";
import { useImageContext } from "/context/ImageContext";
import usePreloadImages from "/hooks/usePreloadImages";

const Button = dynamic(() => import("/components/atoms/Button/Button"), {
  ssr: false,
});
const CatalogItem = dynamic(
  () => import("/components/molecules/CatalogItem/CatalogItem"),
  { ssr: false }
);
const ProductCard = dynamic(
  () => import("/components/molecules/ProductCard/ProductCard"),
  { ssr: false }
);

interface CatalogProps {
  categories: IProductCategory[];
  products: IProduct[];
  selectedCategory?: IProductCategory | null;
  onCategoryClick: (category: IProductCategory) => void;
  handleBackClick: () => void;
  loading: boolean;
}

const Catalog: React.FC<CatalogProps> = ({
  categories,
  products,
  selectedCategory,
  onCategoryClick,
  handleBackClick,
  loading,
}) => {
  const { addImage } = useImageContext();

  usePreloadImages(products.map((product) => product.acf.photo || noneImage));

  useEffect(() => {
    products.forEach((product) => {
      addImage(product.acf.photo || noneImage);
    });
  }, [products, addImage]);

  const handleCategoryClick = useCallback(
    (category: IProductCategory) => {
      onCategoryClick(category);
    },
    [onCategoryClick]
  );

  const content = useMemo(() => {
    if (loading) {
      return <Loading />;
    }

    if (selectedCategory) {
      return (
        <div className={styles.products}>
          <Button
            label="Назад"
            isBack
            isTransparent
            icon
            onClick={handleBackClick}
          />
          {products.length > 0 ? (
            <div className={styles.catalog}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.acf.photo}
                  title={product.name}
                  category={product.acf.type}
                  weight={product.acf.weight}
                  productCategory={selectedCategory.slug}
                  isCatalogProduct
                />
              ))}
            </div>
          ) : (
            <Placeholder message="Список пуст" />
          )}
        </div>
      );
    }

    return categories.length > 0 ? (
      <div className={styles.catalog}>
        {categories.map((item) => (
          <CatalogItem
            key={item.id}
            imageSrc={item.image?.src || noneImage}
            name={item.name}
            onClick={() => handleCategoryClick(item)}
          />
        ))}
      </div>
    ) : (
      <Placeholder message="Список пуст" />
    );
  }, [
    loading,
    selectedCategory,
    categories,
    products,
    handleCategoryClick,
    handleBackClick,
  ]);

  return <Suspense fallback={<Loading />}>{content}</Suspense>;
};

export default Catalog;
