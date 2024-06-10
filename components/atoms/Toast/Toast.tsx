import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";
import Text from "/components/atoms/Text/Text";

interface ToastProps {
  message: string;
  success: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, success }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    visible && (
      <div
        className={`${styles.toast} ${success ? styles.success : styles.error}`}
      >
        <Text variant="body6">{message}</Text>
      </div>
    )
  );
};

export default Toast;
