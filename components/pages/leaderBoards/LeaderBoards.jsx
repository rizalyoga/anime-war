import React from "react";
import Layout from "@/layout/Layout";
import styles from "./leaderboard.module.css";
import Table from "@/components/table/Table";

const LeaderBoards = () => {
  return (
    <Layout>
      <div className="container">
        <div className={styles["leaderboard-header"]}>
          <h1>LEADERBOARDS</h1>
        </div>
        <div className={styles["table-container"]}>
          <Table />
        </div>
      </div>
    </Layout>
  );
};

export default LeaderBoards;
