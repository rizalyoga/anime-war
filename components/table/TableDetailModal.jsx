import React from "react";
import styles from "./table.module.css";

const TableDetailModal = (datas) => {
  return (
    <table className={styles["table-detail"]}>
      <thead className="table-header">
        <tr>
          <th>No</th>
          <th>Villain Name</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td> 1 </td>
          <td>villain Name</td>
          <td>Score</td>
          <td>Date</td>
        </tr>
        {/* {datas.length > 0 &&
          datas.map((data, idx) => (
            <tr key={idx}>
              <td> {idx + 1} </td>
              <td>villain Name</td>
              <td>Score</td>
              <td>Date</td>
            </tr>
          ))} */}
      </tbody>
    </table>
  );
};

export default TableDetailModal;
