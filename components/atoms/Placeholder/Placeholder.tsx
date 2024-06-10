/* components/atoms/Placeholder/Placeholder.tsx */
import React from "react";
import styles from "./Placeholder.module.css";
import Text from "/components/atoms/Text/Text";

interface PlaceholderProps {
  message: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ message }) => {
  return (
    <div className={styles.placeholder}>
      <Text variant="h2" className={styles.message}>
        {message}
      </Text>
    </div>
  );
};

export default Placeholder;
