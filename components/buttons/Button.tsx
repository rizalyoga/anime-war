import { useState } from "react";
import { useRouter } from "next/router";
import { createNewLeaderboard } from "@/data/leaderBoadrs";
import styles from "./buttons.module.css";
import Swal from "sweetalert2";
import getTagname from "../../utils/getTagname";
import { updateDataBattle } from "../alerts/alert";

interface ButtonProps {
  characterId?: string;
  characterName?: string;
  heroName?: string;
  villainName?: string;
}

// Button for goes to city page
export const GoesToCityButton = ({ characterId, characterName }:ButtonProps) => {
  const router = useRouter();

  const goToCity = ():void => {
    
    const tagname = getTagname();

    if (tagname) {
      router.push(`/city/${characterId}?hero=${characterName}`);
    } else {
      Swal.fire({
        text: "Please create tagname first",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <button 
      disabled={characterId ? false : true} 
      id="visible-btn" 
      className={characterId && "goto-city"} 
      onClick={goToCity}>
        Goes To City
    </button>
  );
};

// Button show when palyer win the battle
export const ButtonWin = ({ heroName, villainName } : ButtonProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const goToSharePage = ():void => {
    setLoading((prev) => !prev);

    createNewLeaderboard(heroName, villainName).then((response) => {
      setLoading((prev) => !prev);
      if (response.statusCode) {
        updateDataBattle(heroName, villainName, response.message);
      } else {
        router.push(`/share/${response.id}`);
      }
    });
  };

  return (
    <>
      {/* <button className={styles[("win-btn", "disable-btn")]} disabled={true}> */}
      <button className={styles["disable-btn"]} disabled={true}>
        🏆
      </button>
      <button 
        className={styles["win-btn"]} 
        onClick={goToSharePage} 
        disabled={loading ? true : false}>
        {loading ? "please wait..." : "add leaderboard"}
      </button>
    </>
  );
};

// Button show when palyer lose the battle
export const ButtonLose = () => {
  return (
    <button className={`${styles['disable-btn']} ${styles['lose-btn']} `} disabled={true}>
      You Lose
    </button>
  );
};
