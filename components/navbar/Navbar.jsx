import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { logoutConfirm, createGameTag } from "../alerts/alert";
import { useRouter } from "next/router";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");

  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const nicknames = localStorage.getItem("nickname");

    if (username) {
      setUsername(username.toUpperCase());
    }

    if (nicknames) {
      setNickname(nicknames);
    }
  }, []);

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
    <div className={styles.navbarContainer}>
      <div className={styles.content}>
        <div className={styles["content-left"]}>
          <p>
            {username} {nickname != "" ? `| Id: ${nickname.toUpperCase()}` : null}
          </p>
        </div>
        <div className={styles["content-right"]}>
          <p onClick={toLeadBoard}>Leadboard</p>
          {/* {nickname === "" ? <p onClick={createNickname}>Nickname</p> : null} */}
          {<p onClick={createNickname}>Nickname</p>}
          <p onClick={doLogout}>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
