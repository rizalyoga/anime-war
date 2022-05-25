import React from "react";
import { usePagination, DOTS } from "@/hooks/usePagination";
import styles from "./pagination.module.scss";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination = (props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={`${styles["pagination-container"]} ${styles["pagination-bar"]}`}>
      {/* Left navigation arrow */}
      <li className={`${styles.arrow}`} onClick={onPrevious}>
        <GrFormPrevious />
      </li>
      {paginationRange.map((pageNumber, i) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={i} className={`${styles["pagination-item"]} ${styles.dots}`}>
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li key={i} className={`${styles["pagination-item"]}`} onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li className={styles.arrow} onClick={onNext}>
        <GrFormNext />
      </li>
    </ul>
  );
};

export default Pagination;
