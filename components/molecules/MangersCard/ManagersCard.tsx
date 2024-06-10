import "@splidejs/react-splide/css";
import { FC, memo } from "react";
import styles from "./ManagersCard.module.css";
import Image from "next/image";
import Text from "/components/atoms/Text/Text";
import { ILeader } from "/api/wordpressApi";

interface ManagerCardProps {
  leader: ILeader;
}

const ManagersCard: FC<ManagerCardProps> = ({ leader }) => {
  return (
    <div className={styles.managerCard}>
      <Image
        src={leader.image}
        className={styles.image}
        alt={`${leader.name}`}
        width={300}
        height={300}
      />
      <div className={styles.managerInfo}>
        <Text variant="body2" className={styles.position}>
          {leader.position}
        </Text>
        <Text variant="h5" className={styles.name}>
          {leader.name}
        </Text>
      </div>
    </div>
  );
};

export default ManagersCard;
