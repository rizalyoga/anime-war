import getToken from "../utils/getCookies";
import getTagname from "../utils/getTagname";

import {DataBattleMemory} from "@/components/cards/CardVillains"

const url = process.env.NEXT_PUBLIC_APP_LINK_API_2;

/* ----------------------- // Get data by villain name ---------------------- */
export const getDataByHero = async (nameCharacter: string) => {
  const response = await fetch(`${url}/leaderboards?hero=${nameCharacter}`);
  return response.json();
};

/* ------------------------ // Get data by hero name ------------------------ */
export const getDataByVillain = async (nameCharacter: string) => {
  const response = await fetch(`${url}/leaderboards?villain=${nameCharacter}`);
  return response.json();
};

/* ------------------------ // Create New leaderboard ----------------------- */
export const createNewLeaderboard = async (heroName: string, villainName: string) => {
  const token: string | undefined = getToken();
  const tagname: string | undefined = getTagname();
  const dataSaved = JSON.parse(localStorage.getItem(tagname as string) || "{}");
  let score: number = 0;

  dataSaved &&
    dataSaved.forEach((data: DataBattleMemory) => {
      data.versus == `${heroName}VS${villainName}` ? (score += data.heroHP) : (score += 0);
    });

  const payload = {
    hero: heroName,
    villain: villainName,
    score: score,
  };

  const response = await fetch(`${url}/leaderboards`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  return response.json();
};

/* ------------------------ // Update data leaderboard ----------------------- */
export const updateDataLeaderboard = async (heroName: string, villainName: string, idBattle: number) => {
  const token: string | undefined = getToken();
  const tagname: string | undefined = getTagname();
  const dataSaved = JSON.parse(localStorage.getItem(tagname as string) || "{}");
  let score: number = 0;

  dataSaved &&
    dataSaved.forEach((data: DataBattleMemory) => {
      data.versus == `${heroName}VS${villainName}` ? (score += data.heroHP) : (score += 0);
    });

  const payload = {
    hero: heroName,
    villain: villainName,
    score: score,
  };

  const response = await fetch(`${url}/leaderboards/${idBattle}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  return response.json();
};
