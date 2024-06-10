import React from "react";
import Link from "next/link";
import Text from "/components/atoms/Text/Text";
import styles from "./Wholesale.module.css";
import Button from "/components/atoms/Button/Button";
import Image from "next/image";
import { IWholesaleData } from "/api/wordpressApi";

interface IWholesaleProps {
  wholesaleData: IWholesaleData;
}

const Wholesale: React.FC<IWholesaleProps> = ({ wholesaleData }) => {
  return (
    <section className={styles.wholesale}>
      <div className={styles.imageColumn}>
        <Image
          src={wholesaleData.photo1}
          className={styles.image}
          alt="First Image"
          width={500}
          height={500}
        />
      </div>
      <div className={styles.imageColumn}>
        <Image
          src={wholesaleData?.photo1}
          className={styles.image}
          alt="Second Image"
          width={500}
          height={500}
        />
      </div>
      <div className={styles.textColumn}>
        <div className={styles.textContainer}>
          <Image
            src={wholesaleData?.photo1}
            className={styles.mobileImage}
            alt="Mobile Image"
            width={500}
            height={500}
          />
          <Text variant="h2" className={styles.title}>
            {wholesaleData.title}
          </Text>
          <Text
            variant="h5"
            className={styles.paragraph}
            html={wholesaleData.text}
          />
          <Link href="/wholesale" passHref className={styles.button}>
            <Button label="Узнать подробнее" icon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Wholesale;
