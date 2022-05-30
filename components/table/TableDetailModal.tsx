import React from "react";
import styles from "./table.module.css";
import DateMoment from "../../utils/date";
import { ArrayLeaderboard } from "./Table"

interface PropsSelectedData {
  selectedData : ArrayLeaderboard[];
}

const TableDetailModal = ({ selectedData }: PropsSelectedData) => {
  return (
    <table className={styles["table-detail"]}>
      <thead className={styles["table-header"]}>
        <tr>
          <th>No</th>
          <th>Villain Name</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {selectedData.length > 0 &&
          selectedData.map((data: ArrayLeaderboard, idx: number) => (
            <tr key={idx}>
              <td> {idx + 1} </td>
              <td>{data.villain}</td>
              <td>{data.score}</td>
              <td>
                <DateMoment date={data?.updated_at} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableDetailModal;
