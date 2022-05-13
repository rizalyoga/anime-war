import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./landing-page.module.css";
import Layout from "@/layout/Layout";
import Head from "next/head";

const LandingPage = () => {
  const router = useRouter();

  const startGame = () => {
    router.push("/home");
  };

  const toLeaderboard = () => {
    router.push("/leaderboard");
  };
  return (
    <>
      <Head>
        <title>Anime War</title>
        <link rel="icon" href="/swords.png" type="image/x-icon" />
        <meta title="Anime War" />
        <meta name="description" title={"Game pertempuran antara bertemakan Anime"} />
        <meta name="keywords" content={["Anime", "War", "Game"]} />
        <link rel="canonical" href={"https://anime-war-rizalyoga.vercel.app/"} />
        <meta name="twitter:card" content={"summary"} />
        <meta name="twitter:url" content={"https://anime-war-rizalyoga.vercel.app/"} />
        <meta name="twitter:title" content={"Anime War"} />
        <meta name="twitter:description" content={"Game pertempuran antara bertemakan Anime"} />
        <meta property="og:url" content={"https://anime-war-rizalyoga.vercel.app/"} />
        <meta property="og:image:width" content={1200} />
        <meta property="og:image:height" content={630} />
        <meta property="og:type" content={"Information"} />
        <meta property="og:title" content={"Anime War"} />
        <meta property="og:description" content={"Game pertempuran antara bertemakan Anime"} />
        <meta property="og:image" content={"https://anime-war-rizalyoga.vercel.app/_next/image?url=%2Fswords.png&w=384&q=100"} />
        <meta property="og:image:secure_url" content={"https://anime-war-rizalyoga.vercel.app/_next/image?url=%2Fswords.png&w=384&q=100"} />
      </Head>
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
            <Image src="/assets/anime-war.webp" alt="logo" height={350} width={850} />
          </div>
          <button className={styles["start-game"]} role="button" onClick={startGame}>
            START GAME
          </button>
          {/* <button className={styles["start-game"]} role="button" onClick={toLeaderboard}>
            Leader Board
          </button> */}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
