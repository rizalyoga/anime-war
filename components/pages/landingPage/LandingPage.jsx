import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./landing-page.module.css";
import Layout from "@/layout/Layout";

const LandingPage = () => {
  const router = useRouter();

  const startGame = () => {
    router.push("/home");
  };

  const toLeaderboard = () => {
    router.push("/leaderboard");
  };
  return (
    <Layout title={""}>
      <div className={styles.container}>
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
          <div className={styles["image-container"]}>
            <Image src="/assets/anime-war.png" alt="logo" height={350} width={850} />
          </div>
          <button className={styles["start-game"]} role="button" onClick={startGame}>
            START GAME
          </button>
          <button className={styles["start-game"]} role="button" onClick={toLeaderboard}>
            Leader Board
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
