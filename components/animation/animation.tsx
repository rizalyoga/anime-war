import React from "react";
import styles from "./animation.module.css";

const Animation = ({ children }:{children:React.ReactNode}) => {
  return (
    <div className={styles.area}>
      <ul className={styles.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {children}
    </div>
  );
};

export default Animation;
