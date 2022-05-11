import { useRouter } from "next/router";

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
  // const query = router.query;

  const goToSharePage = () => {
    router.push(`/share/hero=${heroName}&&villain=${villainName}`);
  };

  return (
    <>
      <button className="disable-btn choose-btn" disabled={true} style={{ background: "green", color: "white", cursor: "default" }}>
        🏆
      </button>
      <button className="choose-btn" onClick={goToSharePage} style={{ margin: "3px 0", background: "green", color: "white", cursor: "pointer" }}>
        add leaderborad
      </button>
    </>
  );
};

// Button show when palyer lose the battle
export const ButtonLose = () => {
  return (
    <button className="disable-btn choose-btn" disabled={true} style={{ background: "red", color: "white", cursor: "default" }}>
      You Lose
    </button>
  );
};
