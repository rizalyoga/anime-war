import React, { useState, useEffect } from "react";
import styles from "./table.module.css";
import { headerTitle } from "./header";
import { useRouter } from "next/router";
import Filter from "./filterInput/FilterInput";
import DateMoment from "../../utils/date";
import ModalDetail from "../modal/ModalLeaderboard";

const Table = ({ datas, searchCharacter }) => {
  const [titleFiltered, setTitleFiltered] = useState([]);
  const [selectedDetailData, setSelectedDetailData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
    if (arr?.length == 0) {
      return 0;
    } else {
      let sumTotal = 0;
      arr?.forEach((el) => {
        sumTotal += el.score;
      });

      return sumTotal;
    }
  };

  // Funtion for set Selected Data and open Modal
  const selectData = (detailData) => {
    setIsOpen((prev) => !prev);
    setSelectedDetailData(detailData);
  };

  // Funtion for show modal detail
  const showModal = (id) => {
    alert(`Modal Detail :=> ${id}`);
  };

  return (
    <div className={styles.container}>
      <Filter searchCharacter={searchCharacter} />
      <table className={styles.table}>
        <thead className="table-header">
          <tr>
            {titleFiltered?.map((data, idx) => (
              <th key={idx}>{data.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas.length > 0 &&
            datas.map((data, idx) => (
              <tr key={idx}>
                <td> {idx + 1} </td>
                <td>{!filterBy ? data.name : data.gametag?.name}</td>
                <td>{!filterBy ? sumScore(data.leaderboards) : data.score}</td>
                <td className={styles["date-moment"]}>
                  {!filterBy ? (
                    <button className={styles["detail-button"]} onClick={() => selectData(data.leaderboards)}>
                      Detail
                    </button>
                  ) : (
                    <DateMoment date={data.created_at} />
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {isOpen && <ModalDetail selectedData={selectedDetailData} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Table;
