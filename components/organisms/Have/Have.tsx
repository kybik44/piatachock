import React from "react";
import styles from "./Have.module.css";
import Text from "/components/atoms/Text/Text";
import HaveItem from "/components/molecules/HaveItem/HaveItem";
import { IHaveData, IHaveItem } from "/api/wordpressApi";

interface IHaveProps {
  haveData: IHaveData;
}

const Have: React.FC<IHaveProps> = ({ haveData }) => {
  return (
    <section className={styles.have}>
      <Text variant="h2" className={styles.title}>
        {haveData.title}
      </Text>
      <div className={styles.list}>
        {haveData?.items.map((item, index) => (
          <HaveItem key={index} title={item.title} text={item.text} />
        ))}
      </div>
    </section>
  );
};

export default Have;
