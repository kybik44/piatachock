import React from "react";
import styles from "./Bestsellers.module.css";
import { IBestSellersData } from "/api/wordpressApi";
import Button from "/components/atoms/Button/Button";
import Text from "/components/atoms/Text/Text";
import ProductCard from "/components/molecules/ProductCard/ProductCard";

import Link from "next/link";
import { noneImage } from "/utils/constants";
interface BestSellersProps {
  bestSellersData: IBestSellersData;
}

const BestSellers: React.FC<BestSellersProps> = ({ bestSellersData }) => {
  return (
    <section className={styles.bestsellers}>
      <Text variant="h2" className={styles.title}>
        {bestSellersData.title}
      </Text>
      <div className={styles.container}>
        {bestSellersData?.items?.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.acf.photo || noneImage}
            title={product.name}
            category={product.acf.type}
            weight={product.acf.weight}
            isCatalogProduct={false}
          />
        ))}
      </div>
      <Link href="/catalog" passHref className={styles.catalogButton}>
        <Button
          textClassName={styles.catalogButton}
          label="Перейти в каталог"
          icon
        />
      </Link>
    </section>
  );
};

export default BestSellers;
