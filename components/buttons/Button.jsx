import { useRouter } from "next/router";

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

export const ButtonWin = () => {
  const router = useRouter();

  const goToSharePage = ({ characterId, characterName }) => {
    router.push(`/sharepage/${characterId}?hero=${characterName}`);
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

export const ButtonLose = () => {
  return (
    <button className="disable-btn choose-btn" disabled={true} style={{ background: "red", color: "white", cursor: "default" }}>
      You Lose
    </button>
  );
};
