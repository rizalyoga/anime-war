import React from "react";
import styles from "./sidebar.module.css";
import { logoutConfirm, createGameTag } from "../alerts/alert";
import { useRouter } from "next/router";

const Sidebar = ({ isShow }) => {
  const router = useRouter();

  const doLogout = () => {
    logoutConfirm();
  };

  const toLeadBoard = () => {
    router.push("/leaderboard");
  };

  const createNickname = () => {
    createGameTag();
  };

  return (
    <div className={isShow ? `${styles.container} ${styles.active}` : styles.container}>
      <div className={styles["menu-list"]}>
        <p onClick={toLeadBoard}>Leaderboard</p>
        <p onClick={createNickname}>Gametag</p>
        <p onClick={doLogout}>Log out</p>
      </div>
    </div>
  );
};

export default Sidebar;
