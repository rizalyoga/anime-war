import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { logoutConfirm } from "../alerts/alert";

const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUsername(username.toUpperCase());
    }
  }, []);

  const doLogout = () => {
    logoutConfirm();
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.content}>
        <div className={styles["content-left"]}>
          <p>{username}</p>
        </div>
        <div className={styles["content-right"]}>
          <p onClick={doLogout}>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
