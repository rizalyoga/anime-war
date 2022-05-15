import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { logoutConfirm, createGameTag } from "../alerts/alert";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import getTagname from "../../utils/getTagname";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import Sidebar from "./Sidebar.jsx";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [isShow, setIsShow] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const username = Cookies.get("username");
    const nicknames = getTagname();

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

  const showSidebar = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <>
      <Sidebar isShow={isShow} />
      <div className={styles.navbarContainer}>
        <div className={styles.content}>
          <div className={styles["content-left"]}>
            <p>
              {username} {nickname != "" ? `| Id: ${nickname.toUpperCase()}` : null}
            </p>
          </div>
          <div className={styles["content-right"]}>
            <p onClick={toLeadBoard}>Leadboard</p>
            <p onClick={createNickname}>Gametag</p>
            <p onClick={doLogout}>Log out</p>
            {isShow ? <CgClose className={styles["close-button"]} onClick={showSidebar} /> : <GiHamburgerMenu className={styles["menu-button"]} onClick={showSidebar} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
