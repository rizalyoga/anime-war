import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../table.module.css";
import { AiOutlineSearch } from "react-icons/ai";

function FilterInput() {
  const router = useRouter();
  const { query } = useRouter();

  const [filter, setFilter] = useState("gametag");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Funtion for hidden input filter when page leaderboard default
    const hiddenFilterInput = () => {
      if (!query.filter) {
        setHidden(true);
      } else if (query.filter) {
        setHidden(false);
      }
    };
    hiddenFilterInput();
  }, [query.filter]);

  // Funtion for setting default filter select
  const filterBy = (term) => {
    if (term == "gametag") {
      setFilter("gametag");
      router.push("/leaderboard");
    } else if (term !== filter) {
      setFilter(term);
      filterRoute(term);
    }
  };

  // function for direction url when filter selected
  const filterRoute = (term) => {
    if (term == "hero" || "villain") {
      router.push(`leaderboard/?filter=${term}`);
    }
  };

  return (
    <div className={styles["top-content"]}>
      <div className={styles["left-content"]} style={hidden ? { display: "none" } : null}>
        <input type="text" placeholder="input search" />
        <AiOutlineSearch className={styles.icon} />
      </div>
      <div className={styles["right-content"]}>
        <select name="select-filter" value={filter} id="select-filter" onChange={(e) => filterBy(e.target.value)} className={styles["select-filter"]}>
          <option value="gametag">By Gametag</option>
          <option value="hero">By Hero</option>
          <option value="villain">By Villain</option>
        </select>
      </div>
    </div>
  );
}

export default FilterInput;
