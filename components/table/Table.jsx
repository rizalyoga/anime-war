import React from "react";
import styles from "./table.module.css";
import { headerTitle } from "./header";

const Table = ({ datas }) => {
  const data = [
    {
      rank: "1",
      nametag: "dragnell",
      total_score: "2000",
      score: "40",
      date: "20-10-2022",
    },
    {
      rank: "2",
      nametag: "leo",
      total_score: "1000",
      score: "20",
      date: "21-10-2022",
    },
    {
      rank: "3",
      nametag: "nwo",
      total_score: "1000",
      score: "50",
      date: "20-11-2022",
    },
  ];

  const showModal = () => {
    alert("ini modal");
  };

  return (
    <div className={styles.container}>
      <div className={styles["top-content"]}>
        <div className={styles["left-content"]}>
          <input type="text" placeholder="input search" />
        </div>
        <div className={styles["right-content"]}>
          <select name="select-filter" id="select-filter" className={styles["select-filter"]}>
            <option value="ByGametag">By Gametag</option>
            <option value="ByHero">By Hero</option>
            <option value="ByVillain">By Villain</option>
          </select>
        </div>
      </div>
      <table className={styles.table}>
        <thead className="table-header">
          <tr>
            {headerTitle.map((data, idx) => (
              <th key={idx}>{data.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((data, idx) => (
            <tr key={idx}>
              <td> {data.rank} </td>
              <td>{data.nametag}</td>
              <td>{data.total_score}</td>
              <td>{data.score}</td>
              <td>{data.date}</td>
              <td>
                <button className={styles["detail-button"]} onClick={showModal}>
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
