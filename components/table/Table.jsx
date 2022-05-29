import React, { useState, useEffect, useMemo } from "react";
import styles from "./table.module.css";
import { headerTitle } from "./header";
import { useRouter } from "next/router";
import Filter from "./filterInput/FilterInput";
import DateMoment from "../../utils/date";
import ModalDetail from "../modal/ModalLeaderboard";
import Pagination from "../paginations/Pagination";
import sortBy from "utils/sortBy";

const Table = ({ datas, searchCharacter }) => {
  const [titleFiltered, setTitleFiltered] = useState([]);
  const [selectedDetailData, setSelectedDetailData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterGametag, setFilterGametag] = useState();

  const router = useRouter();
  const filterBy = router.query.filter;

  // States for pagination
  let pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);

  // Function for sum the total score
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

  // Function for set pagination
  const currentTableData = useMemo(() => {
    const _data = datas;
    let dataSort = [];

    if (filterBy) {
      dataSort = _data.sort(sortBy("score", true, parseInt));
    } else {
      dataSort = _data.map((data) => ({ ...data, totalScore: sumScore(data.leaderboards) }))
      .sort(sortBy("totalScore", true, parseInt));
    }
    const data_ = dataSort.map((data, i) => ({ ...data, num: i + 1 }));

    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;

    return data_.slice(firstPageIndex, lastPageIndex);
  }, [datas, currentPage, filterBy]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentPage(1);
    }, 400);
  }, [datas, filterBy]);

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

  // Function for set Selected Data and open Modal
  const selectData = (detailData) => {
    setIsOpen((prev) => !prev);
    setSelectedDetailData(detailData);
  };

  // Function for set filter data by gametag
  const filterByGametag = (gametag) => {
    setFilterGametag(gametag);
  };

  return (
    <div className={styles.container}>
      <Filter searchCharacter={searchCharacter} filterByGametag={filterByGametag} />
      <table className={styles.table}>
        <thead className="table-header">
          <tr>
            {titleFiltered?.map((data, idx) => (
              <th key={idx}>{data.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((data) => (
            <tr key={data.id}>
              <td> {data.num} </td>
              <td>{!filterBy ? data.name : data.gametag?.name}</td>
              <td>{!filterBy ? data.totalScore : data.score}</td>
              <td className={styles["date-moment"]}>
                {!filterBy ? (
                  <button 
                    className={styles["detail-button"]} 
                    onClick={() => selectData(data.leaderboards)}>
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
      <div className={styles.pagination}>
        <Pagination 
          className="pagination-bar" 
          currentPage={currentPage} 
          totalCount={datas.length} 
          pageSize={pageSize} 
          onPageChange={(page) => setCurrentPage(page)} 
        />
      </div>
      {isOpen && <ModalDetail selectedData={selectedDetailData} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Table;
