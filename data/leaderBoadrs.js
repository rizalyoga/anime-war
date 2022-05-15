import getToken from "../utils/getCookies";
import getTagname from "../utils/getTagname";

/* ----------------------- // Get data by villain name ---------------------- */
export const getDataByHero = async (nameCharacter) => {
  const response = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards?hero=${nameCharacter}`);
  const data = await response.json();

  //   console.log(data);
  return data;
};

/* ------------------------ // Get data by hero name ------------------------ */
export const getDataByVillain = async (nameCharacter) => {
  const response = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards?villain=${nameCharacter}`);
  const data = await response.json();

  //   console.log(data);
  return data;
};

/* ------------------------ // Create New leaderboard ----------------------- */
export const createNewLeaderboard = async (heroName, villainName) => {
  const token = getToken();
  const tagname = getTagname();
  const dataSaved = JSON.parse(localStorage.getItem(tagname));
  const score = 0;

  dataSaved &&
    dataSaved.forEach((data) => {
      data.versus == `${heroName}VS${villainName}` ? (score += data.heroHP) : (score += 0);
    });

  const payload = {
    hero: heroName,
    villain: villainName,
    score: score,
  };

  const response = await fetch(`https://thrive-project-be.herokuapp.com/leaderboards`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return data;
};
