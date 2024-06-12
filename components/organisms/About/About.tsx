import Image from "next/image";
import React from "react";
import styles from "./About.module.css";
import { IAboutData } from "/api/wordpressApi";
import Text from "/components/atoms/Text/Text";
import { noneImage } from "/utils/constants";
interface AboutProps {
  aboutData: IAboutData;
}

const About: React.FC<AboutProps> = ({ aboutData }) => {
  return (
    <section className={styles.about}>
      <div className={styles.content}>
        <article className={styles.info}>
          <Text variant="h2" className={styles.title}>
            {aboutData.title}
          </Text>
          <Text
            variant="subtitle2"
            className={styles.text}
            html={aboutData.text || ""}
          />
        </article>
        <Image
          className={styles.image}
          src={aboutData.photo1 || noneImage}
          alt="Фото О Нас"
          layout="responsive"
          width={700}
          height={475}
          quality={100}
        />
      </div>
    </section>
  );
};

export default About;
