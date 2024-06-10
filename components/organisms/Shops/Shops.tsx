import React, { useCallback, useMemo } from "react";
import styles from "./Shops.module.css";
import { IShopsItem } from "/api/wordpressApi";
import Text from "/components/atoms/Text/Text";
import dynamic from "next/dynamic";

const ShopCard = dynamic(
  () => import("/components/molecules/ShopCard/ShopCard"),
  { ssr: false }
);

interface ShopsProps {
  shopsData: IShopsItem[];
  onShopSelect: (coordinates: [number, number], city: string) => void;
}

const Shops: React.FC<ShopsProps> = ({ shopsData, onShopSelect }) => {
  const renderShopCards = useMemo(
    () =>
      shopsData.map((shop) => (
        <ShopCard
          key={shop.id}
          image={shop.acf.photo?.link}
          city={shop.acf.city}
          district={shop.acf.district}
          address={shop.acf.address}
          workingHours={shop.acf.working_hours}
          weekendHours={shop.acf.weekend_hours}
          coordinates={shop.acf.coordinates}
          onShopSelect={onShopSelect}
        />
      )),
    [shopsData, onShopSelect]
  );

  return (
    <section className={styles.shops}>
      <Text variant="h2" className={styles.title}>
        Магазины
      </Text>
      <div className={styles.container}>{renderShopCards}</div>
    </section>
  );
};

export default Shops;
