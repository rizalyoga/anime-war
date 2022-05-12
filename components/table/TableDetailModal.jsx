import React from "react";
import styles from "./table.module.css";
import DateMoment from "../../utils/date";

const TableDetailModal = ({ selectedData }) => {
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
          selectedData.map((data, idx) => (
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
