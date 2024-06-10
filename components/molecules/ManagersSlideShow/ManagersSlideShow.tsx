import React from "react";
import ManagersCard from "/components/molecules/MangersCard/ManagersCard";
import Carousel from "/components/molecules/Carousel/Carousel";
import styles from "./ManagersSlideShow.module.css";

interface Leader {
  position: string;
  name: string;
  image: string;
}

interface ManagersSlideShowProps {
  leaders: Leader[];
}

const ManagersSlideShow: React.FC<ManagersSlideShowProps> = ({ leaders }) => {
  const items = leaders.map((leader, index) => ({
    id: index,
    content: <ManagersCard leader={leader} />,
  }));

  return (
    <section className={styles.managersSlideShow}>
      <Carousel items={items} perPageDesktop={1} />
    </section>
  );
};

export default ManagersSlideShow;
