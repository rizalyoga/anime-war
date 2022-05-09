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

  console.log(datas.data);

  const router = useRouter();
  const filterBy = router.query.filter;

  // Filter table header title
  useEffect(() => {
    if (!filterBy) {
      const headers = headerTitle.filter((data) => data.title != "Score" && data.title != "Date");
      setTitleFiltered(headers);
    } else if (filterBy == "villain" || "hero") {
      const headers = headerTitle.filter((data) => data.title != "Total Score" && data.title != "Detail");
      setTitleFiltered(headers);
    } else {
      setTitleFiltered(headerTitle);
    }
  }, [filterBy]);

  // Funtion for sum the total score
  const sumScore = (arr) => {
    if (arr.length == 0) {
      return 0;
    } else {
      const sumTotal = 0;
      arr.forEach((el) => {
        sumTotal += el.score;
      });

      return sumTotal;
    }
  };

  // Funtion for show modal detail
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
              <td>{!filterBy ? sumScore(data.leaderboards) : data.score}</td>
              <td className={styles["date-moment"]}>
                {!filterBy ? (
                  <button className={styles["detail-button"]} onClick={() => showModal(data.id)}>
                    Detail
                  </button>
                ) : (
                  <Moment format="DD-MM-YYYY">{data.created_at}</Moment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
