import { useRouter } from "next/router";

export const GoesToCityButton = ({ characterId, characterName }) => {
  const router = useRouter();

  const goToCity = () => {
    // navigate(`/city/${characterId}/${characterName}`);
    console.log(router);
  };

  return (
    <button disabled={characterId ? false : true} id="visible-btn" className={characterId && "choose-btn"} onClick={goToCity}>
      Goes To City
    </button>
  );
};

export const ButtonWin = () => {
  return (
    <button className="disable-btn choose-btn" disabled={true} style={{ background: "green", color: "white", cursor: "default" }}>
      You Win
    </button>
  );
};

export const ButtonLose = () => {
  return (
    <button className="disable-btn choose-btn" disabled={true} style={{ background: "red", color: "white", cursor: "default" }}>
      You Lose
    </button>
  );
};
