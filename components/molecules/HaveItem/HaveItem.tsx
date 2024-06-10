import React from "react";
import styles from "./HaveItem.module.css";
import Text from "/components/atoms/Text/Text";

interface HaveItemProps {
  title: string;
  text: string;
}

const HaveItem: React.FC<HaveItemProps> = ({ title, text }) => (
  <div className={styles.container}>
    <Text variant="h3" className={styles.title}>
      {title}
    </Text>
    <Text variant="subtitle2" className={styles.text}>
      {text}
    </Text>
  </div>
);

export default HaveItem;
