import React from "react";
import styles from "./Reviews.module.css";
import Text from "/components/atoms/Text/Text";
import Carousel from "/components/molecules/Carousel/Carousel";

interface ReviewsProps {
  reviews: { author: string; feedback: string }[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  const items = reviews.map((review, index) => ({
    id: index,
    content: (
      <div className={styles.review}>
        <Text variant="h4" fontWeight={700} className={styles.name}>
          {review.author}
        </Text>
        <Text variant="body1" className={styles.text}>
          {review.feedback}
        </Text>
      </div>
    ),
  }));

  return (
    <section className={styles.reviews}>
      <Text variant="h2" className={styles.title}>
        Отзывы наших партнеров
      </Text>
      <Carousel
        items={items}
        perPageDesktop={3}
        perPageTablet={2}
        perPageMobile={1}
        isMainPage={false}
      />
    </section>
  );
};

export default Reviews;
