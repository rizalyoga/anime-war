import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../table.module.css";
import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  searchCharacter: (name: string) => void;
  filterByGametag: (gametag: string) => void;
}

function FilterInput({ searchCharacter, filterByGametag }: Props ) {
  const router = useRouter();
  const { query } = useRouter();

  const [filter, setFilter] = useState(query.filter ? query.filter : "gametag");
  const [nameCharacter, setNameCharacter] = useState("");
  const [hidden, setHidden] = useState(false);
  const [gametag, setGametag] = useState("");

  // Funtion for initialize value in searchCharacter
  const initializeCharacter = () => {
    if (query.filter == "hero") {
      setNameCharacter("Goku");
      searchCharacter("Goku");
    } else if (query.filter == "villain") {
      setNameCharacter("Frieza");
      searchCharacter("Frieza");
    }
  };

  // Run Initialize funtion
  useEffect(() => {
    initializeCharacter();
  }, [query]);

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
  const filterBy = (term: string) => {
    if (term == "gametag") {
      setFilter("gametag");
      router.push("/leaderboard");
    } else if (term !== filter) {
      setFilter(term);
      filterRoute(term);
    }
  };

  // function for direction url when filter selected
  const filterRoute = (term: string) => {
    if (term == "hero" || "villain") {
      router.push(`leaderboard/?filter=${term}`);
    }
  };

  // Funtion for start filter by character name
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    searchCharacter(nameCharacter);
  };

  // Funtion for start filter by game name
  useEffect(() => {
    filterByGametag(gametag);
  }, [gametag]);

  // hidden style
  const hiddenStyles: React.CSSProperties  = {
    display: "none"
  }

  return (
    <div className={styles["top-content"]}>
      <div className={styles["left-content"]} style={hidden ? hiddenStyles : undefined}>
        <form onSubmit={handleSubmit}>
          <input type="search" value={nameCharacter} placeholder="input search" onChange={(e) => setNameCharacter(e.target.value)} />
          <AiOutlineSearch className={styles.icon} onClick={handleSubmit} />
        </form>
      </div>
      <div className={styles["mid-content"]} style={hidden ? hiddenStyles : undefined} >
        <h4>{nameCharacter ? `Hasil Search : ${nameCharacter.toUpperCase()}` : "Input charcater name first"} </h4>
      </div>
      {/* <input type="search" value={gametag} onChange={(e) => setGametag(e.target.value)} placeholder="player name" /> */}
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
