import getToken from "../utils/getCookies";

export const getDataByHero = async (nameCharacter) => {
  const response = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards?hero=${nameCharacter}`);
  const data = await response.json();

  //   console.log(data);
  return data;
};

export const getDataByVillain = async (nameCharacter) => {
  const response = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards?villain=${nameCharacter}`);
  const data = await response.json();

  //   console.log(data);
  return data;
};

export const createNewLeaderboard = async (heroName, villainName) => {
  const token = getToken();
  const score = JSON.parse(localStorage.getItem(`${heroName}VS${villainName}`));
  const payload = {
    hero: heroName,
    villain: villainName,
    score: score.heroHP,
  };

  const response = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  console.log(data);
  return data;
};
