import React, { useState, useEffect } from "react";
import styles from "./table.module.css";
import { headerTitle } from "./header";
import { useRouter } from "next/router";
import Filter from "./filterInput/FilterInput";
import Moment from "react-moment";

const Table = ({ datas }) => {
  // const data = [
  //   {
  //     nametag: "dragnell",
  //     total_score: "2000",
  //     score: "40",
  //     date: "20-10-2022",
  //   },
  //   {
  //     nametag: "leo",
  //     total_score: "1000",
  //     score: "20",
  //     date: "21-10-2022",
  //   },
  //   {
  //     nametag: "nwo",
  //     total_score: "1000",
  //     score: "50",
  //     date: "20-11-2022",
  //   },
  //   {
  //     nametag: "Gray",
  //     total_score: "8000",
  //     score: "100",
  //     date: "20-12-2022",
  //   },
  // ];

  const [titleFiltered, setTitleFiltered] = useState([]);

  const router = useRouter();
  const filterBy = router.query.filter;

  useEffect(() => {
    if (!filterBy) {
      const headers = headerTitle.filter((data) => data.title != "Score" && data.title != "Total Score");
      setTitleFiltered(headers);
    } else {
      setTitleFiltered(headerTitle);
    }
  }, [filterBy]);

  const showModal = (id) => {
    alert(`Modal Detail :=> ${id}`);
  };

  return (
    <div className={styles.container}>
      <Filter />
      <table className={styles.table}>
        <thead className="table-header">
          <tr>
            {titleFiltered?.map((data, idx) => (
              <th key={idx}>{data.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas?.data.map((data, idx) => (
            <tr key={idx}>
              <td> {idx + 1} </td>
              <td>{data.name}</td>
              <td>{data?.total_score}</td>
              <td>{data?.score}</td>
              <td>
                <Moment format="DD-MM-YYYY">{data.created_at}</Moment>
              </td>
              <td>
                <button className={styles["detail-button"]} onClick={() => showModal(data.id)}>
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
