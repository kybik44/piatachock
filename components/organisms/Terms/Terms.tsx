import Image from "next/image";
import * as React from "react";
import styles from "./Terms.module.css";
import { ITermsData } from "/api/wordpressApi";
import TermsInfo from "/components/molecules/TermsInfo/TermsInfo";
import { noneImage } from "/utils/constants";

interface TermsProps {
  termsData: ITermsData;
}

const Terms: React.FC<TermsProps> = ({ termsData }) => {
  return (
    <section className={styles.terms}>
      <div className={styles.contentWrapper}>
        <TermsInfo title={termsData?.title} text={termsData?.text} />
        <Image
          className={styles.imagePlaceholder}
          src={termsData?.photo || noneImage}
          alt="Фото О Нас"
          width={400}
          height={400}
          layout="responsive"
          objectFit="contain"
        />
      </div>
    </section>
  );
};

export default Terms;
