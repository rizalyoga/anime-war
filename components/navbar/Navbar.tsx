import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { logoutConfirm, createGameTag } from "../alerts/alert";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import getTagname from "../../utils/getTagname";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [username, setUsername] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const username: string | undefined = Cookies.get("username");
    const nicknames: string | undefined = getTagname();

    if (username) {
      setUsername(username.toUpperCase());
    }

    if (nicknames) {
      setNickname(nicknames);
    }
  }, []);

  const doLogout = (): void => {
    logoutConfirm();
  };

  const toLeadBoard = (): void => {
    router.push("/leaderboard");
  };

  const createNickname = (): void => {
    createGameTag();
  };

  const showSidebar = (): void => {
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
            <p onClick={toLeadBoard}>Leaderboard</p>
            <p onClick={createNickname}>Gametag</p>
            <p onClick={doLogout}>Log out</p>
              {isShow ? 
                <CgClose 
                  className={styles["close-button"]} 
                  onClick={showSidebar} /> 
                  : 
                <GiHamburgerMenu 
                  className={styles["menu-button"]}
                  onClick={showSidebar} 
              />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
