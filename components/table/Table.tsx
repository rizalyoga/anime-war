import React, { useState, useEffect, useMemo } from "react";
import styles from "./table.module.css";
import { headerTitle, HeaderTitle } from "./header";
import { useRouter } from "next/router";
import Filter from "./filterInput/FilterInput";
import DateMoment from "../../utils/date";
import ModalDetail from "../modal/ModalLeaderboard";
import Pagination from "../paginations/Pagination";
import sortBy from "utils/sortBy";
import { PropsDataByFilter} from "../pages/leaderBoards/LeaderBoards"
import { DataLeaderboards } from "../../pages/leaderboard/index"

interface PropsDatas {
  datas: DataLeaderboards[] | PropsDataByFilter[];
  searchCharacter: (name: string) => void;
}

export interface ArrayLeaderboard {
  created_at: string;
  gametag: number;
  hero: string;
  id: number;
  published_at: string;
  score: number;
  updated_at: string;
  villain: string;
}

const Table = ({ datas, searchCharacter }: any) => {
  const [titleFiltered, setTitleFiltered] = useState<HeaderTitle[]>([]);
  const [selectedDetailData, setSelectedDetailData] = useState<ArrayLeaderboard[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filterGametag, setFilterGametag] = useState<string | null>();
  
  const router = useRouter();
  const filterBy = router.query.filter;

  // States for pagination
  let pageSize: number = 12;
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Function for sum the total score
  const sumScore = (arr: ArrayLeaderboard[]): number => {
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
      dataSort = _data.map((data: any) => ({ ...data, totalScore: sumScore(data.leaderboards) }))
      .sort(sortBy("totalScore", true, parseInt));
    }
    const data_ = dataSort.map((data: any, i: number) => ({ ...data, num: i + 1 }));

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
  const selectData = (detailData: ArrayLeaderboard[]): void => {
    setIsOpen((prev) => !prev);
    setSelectedDetailData(detailData);
  };

  // Function for set filter data by gametag
  const filterByGametag = (gametag: string): void => {
    setFilterGametag(gametag);
  };

  return (
    <div className={styles.container}>
      <Filter searchCharacter={searchCharacter} filterByGametag={filterByGametag} />
      <table className={styles.table}>
        <thead className="table-header">
          <tr>
            {titleFiltered?.map((data: HeaderTitle, idx: number) => (
              <th key={idx}>{data.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentTableData.map((data: any) => (
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
          onPageChange={(page: number) => setCurrentPage(page)} 
        />
      </div>
      {isOpen && <ModalDetail selectedData={selectedDetailData} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Table;
