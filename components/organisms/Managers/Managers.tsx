import React from "react";
import styles from "./Managers.module.css";
import { IManagersData } from "/api/wordpressApi";
import Button from "/components/atoms/Button/Button";
import Text from "/components/atoms/Text/Text";
import ContactPopup from "/components/molecules/ContactPopup/ContactPopup";
import ManagersSlideShow from "/components/molecules/ManagersSlideShow/ManagersSlideShow";
import { usePopup } from "/context/PopupContext";

interface IManagersProps {
  managersData: IManagersData;
}

const Managers: React.FC<IManagersProps> = ({ managersData }) => {
  const { openPopup } = usePopup();

  const handleClick = () => {
    openPopup(<ContactPopup />);
  };

  return (
    <section className={styles.managers}>
      <div className={styles.info}>
        <div className={styles.infoContent}>
          <div className={styles.textContent}>
            <Text variant="h2" className={styles.title}>
              {managersData.title}
            </Text>
            <Text
              variant="body4"
              multiline
              className={styles.text}
              html={managersData.text}
            />
          </div>
          <Button
            className={styles.button}
            label="Связаться"
            icon
            onClick={handleClick}
          />
        </div>
      </div>
      <ManagersSlideShow leaders={managersData.managers} />
    </section>
  );
};

export default Managers;
