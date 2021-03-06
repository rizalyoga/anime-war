import React from "react";
import { RiCloseLine } from "react-icons/ri";
import styles from "./modal.module.css";
import TableDetailModal from "../table/TableDetailModal";

// Interfaces
import {ArrayLeaderboard} from "../table/Table"


interface PropsSelectedData {
  selectedData: ArrayLeaderboard[];
  setIsOpen: (e: boolean) => void;
}

const ModalLeaderboard = ({ selectedData, setIsOpen }: PropsSelectedData) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modalLeaderBoard}>
          {/* <div className={styles.modalHeader}>
            <h5 className={styles.headingLeaderBoard}>TITLE CONTENT</h5>
          </div> */}
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <TableDetailModal selectedData={selectedData} />
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className="choose-btn" onClick={() => setIsOpen(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalLeaderboard;
