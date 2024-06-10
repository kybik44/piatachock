import React from "react";
import styles from "./Loading.module.css";

const Loading: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loading;
