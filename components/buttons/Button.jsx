import { useRouter } from "next/router";
import { createNewLeaderboard } from "@/data/leaderBoadrs";
import styles from "./buttons.module.css";

// Button for goes to city page
export const GoesToCityButton = ({ characterId, characterName }) => {
  const router = useRouter();

  const goToCity = () => {
    router.push(`/city/${characterId}?hero=${characterName}`);
  };

  return (
    <button disabled={characterId ? false : true} id="visible-btn" className={characterId && "goto-city"} onClick={goToCity}>
      Goes To City
    </button>
  );
};

// Button show when palyer win the battle
export const ButtonWin = ({ heroName, villainName }) => {
  const router = useRouter();

  const goToSharePage = () => {
    createNewLeaderboard(heroName, villainName).then((response) => {
      if (response.statusCode) {
        alert(response.message);
      } else {
        router.push(`/share/${response.id}`);
      }
    });
  };

  return (
    <>
      <button className={styles[("win-btn", "disable-btn")]} disabled={true}>
        🏆
      </button>
      <button className={styles["win-btn"]} onClick={goToSharePage}>
        add leaderborad
      </button>
    </>
  );
};

// Button show when palyer lose the battle
export const ButtonLose = () => {
  return (
    <button className={styles[("disable-btn", "lose-btn")]} disabled={true}>
      You Lose
    </button>
  );
};
