import React from "react";
import { usePagination, DOTS } from "@/hooks/usePagination";
import styles from "./pagination.module.scss";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

export interface PropsPagination {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  className: string;
}

const Pagination = (props: PropsPagination) => {
  const { onPageChange, totalCount, siblingCount, currentPage, pageSize } = props;

  const paginationRange: any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = (): void => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  let lastPage: number = paginationRange[paginationRange.length - 1];

  return (
    <ul className={`${styles["pagination-container"]} ${styles["pagination-bar"]}`}>
      {/* Left navigation arrow */}
      <li className={`${styles.arrow}`} onClick={onPrevious}>
        <GrFormPrevious />
      </li>
      {paginationRange.map((pageNumber: string, i:number) => {
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
          <li key={i} className={`${styles["pagination-item"]}`} onClick={() => onPageChange(Number(pageNumber))}>
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
