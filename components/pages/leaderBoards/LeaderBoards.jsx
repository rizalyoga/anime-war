import React from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/Layout";
import styles from "./leaderboard.module.css";
import Table from "@/components/table/Table";

const LeaderBoards = (data) => {
  const router = useRouter();

  const toHome = () => {
    router.push("/");
  };
  const toHero = () => {
    router.push("/home");
  };

  return (
    <Layout>
      <div className="container">
        <div className={styles["leaderboard-header"]}>
          <h1>LEADERBOARDS</h1>
          <div className={styles.directions}>
            <h3 onClick={toHome}>Home Page</h3>
            <h3 onClick={toHero}>Hero Page</h3>
          </div>
        </div>
        <div className={styles["table-container"]}>
          <Table datas={data} />
        </div>
      </div>
    </Layout>
  );
};

export default LeaderBoards;
