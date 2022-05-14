import React, { useState, useEffect } from "react";
import styles from "./table.module.css";
import { headerTitle } from "./header";
import { useRouter } from "next/router";
import Filter from "./filterInput/FilterInput";
import DateMoment from "../../utils/date";
import ModalDetail from "../modal/ModalLeaderboard";
import ReactPaginate from "react-paginate";

const Table = ({ datas, searchCharacter }) => {
  const [titleFiltered, setTitleFiltered] = useState([]);
  const [selectedDetailData, setSelectedDetailData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterGametag, setFilterGametag] = useState();

  const router = useRouter();
  const filterBy = router.query.filter;

  // States for pagination
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);

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

  // Function for set pagination
  const sliceData = async () => {
    const data_ = await datas.map((data, i) => ({ ...data, num: i + 1 }));
    const slice = data_.slice(offset, offset + perPage);
    setData(slice);
    setPageCount(Math.ceil(datas.length / perPage));
  };
  console.log(data);
  useEffect(() => {
    sliceData();
  }, [datas, offset]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage);
  };

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

  // Funtion for set filter data by gametag
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
          {data.length > 0 &&
            data
              .filter((data) => data.name?.toLowerCase().includes(filterGametag.toLowerCase()) || data.gametag?.name.toLowerCase().includes(filterGametag.toLowerCase()))
              .map((data) => (
                <tr key={data.id}>
                  <td> {data.num} </td>
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
      <div className={styles.pagination}>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
      {isOpen && <ModalDetail selectedData={selectedDetailData} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Table;
