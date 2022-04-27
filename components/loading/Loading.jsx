import React from "react";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles["container-loading"]}>
      <h1 className={styles["loading"]}>Please Wait...</h1>
    </div>
  );
};

export default Loading;
