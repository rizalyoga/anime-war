import React from "react";
import styles from "./loading.module.css";
import Image from "next/image";

const Loading = () => {
  return (
    <div className={styles["container-loading"]}>
      {/* // <h1 className={styles["loading"]}>Please Wait...</h1> */}
      <Image src="/swords.png" alt="icon" height={100} width={100} />
      <span className={styles.back}>
        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
      </span>
    </div>
  );
};

export default Loading;
