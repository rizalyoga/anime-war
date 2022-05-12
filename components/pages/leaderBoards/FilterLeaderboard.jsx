import React from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/Layout";
import styles from "./leaderboard.module.css";
import Table from "@/components/table/Table";

const FilterLeaderBoards = (props) => {
  const router = useRouter();
  const { query } = router();

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
          <h6>{query.filter}</h6>
          <div className={styles.directions}>
            <h3 onClick={toHome}>Home Page</h3>
            <h3 onClick={toHero}>Hero Page</h3>
          </div>
        </div>
        <div className={styles["table-container"]}>
          <Table />
        </div>
      </div>
    </Layout>
  );
};

export default FilterLeaderBoards;
