import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/layout/Layout";
import styles from "./leaderboard.module.css";
import Table from "@/components/table/Table";
import { getDataByHero, getDataByVillain } from "@/data/leaderBoadrs";

const LeaderBoards = (data) => {
  const [dataLeaderBoard, setDataLeaderBoard] = useState([]);
  const [character, setCharacter] = useState("");
  const router = useRouter();
  const { query } = useRouter();

  // Set data byGametag from SSR
  useEffect(() => {
    if (data.data.length > 0 && !query.filter) {
      setDataLeaderBoard(data.data);
    }
  }, [data]);

  // Set data byHero from CSR
  useEffect(() => {
    if (query.filter == "hero") {
      getDataByHero(character).then((data) => setDataLeaderBoard(data));
      setDataLeaderBoard([]);
    }
  }, [query.filter, character]);

  // Set data byVillain from CSR
  useEffect(() => {
    if (query.filter == "villain") {
      getDataByVillain(character).then((data) => setDataLeaderBoard(data));
      setDataLeaderBoard([]);
    }
  }, [query.filter, character]);

  // Function for search character
  const searchCharacter = (name) => {
    setCharacter(name);
  };

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
          <Table searchCharacter={searchCharacter} datas={dataLeaderBoard} />
        </div>
      </div>
    </Layout>
  );
};

export default LeaderBoards;
