import * as React from "react";
import styles from "./TermsInfo.module.css";
import Text from "/components/atoms/Text/Text";

interface TermsInfoProps {
  title: string;
  text: string;
}

const TermsInfo: React.FC<TermsInfoProps> = ({ title, text }) => {
  return (
    <article className={styles.termsInfo}>
      <Text variant="h2" className={styles.title}>
        {title}
      </Text>
      <Text variant="subtitle1" className={styles.paragraph} html={text} />
    </article>
  );
};

export default TermsInfo;
