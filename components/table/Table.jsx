import React from "react";
import styles from "./table.module.css";
import { headerTitle } from "./header";
import Filter from "./filterInput/FilterInput";

const Table = ({ datas }) => {
  const data = [
    {
      nametag: "dragnell",
      total_score: "2000",
      score: "40",
      date: "20-10-2022",
    },
    {
      nametag: "leo",
      total_score: "1000",
      score: "20",
      date: "21-10-2022",
    },
    {
      nametag: "nwo",
      total_score: "1000",
      score: "50",
      date: "20-11-2022",
    },
    {
      nametag: "Gray",
      total_score: "8000",
      score: "100",
      date: "20-12-2022",
    },
  ];

  const showModal = () => {
    alert("Modal Detail");
  };

  return (
    <div className={styles.container}>
      <Filter />
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
              <td> {idx + 1} </td>
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
