import {ModalBattlePayload} from "@/components/modal/ModalInterfaces"

export let loadings:boolean = true;

const url : string | undefined = process.env.NEXT_PUBLIC_APP_LINK_API_1;

// Get Data Hero
export const getAllData = async () => {
  const response = await fetch(`${url}/api/hero`);
  return response.json();
};

// Get Data Skill
export const getSkill = async (characterId:string) => {
  const response = await fetch(`${url}/api/hero/${characterId}`);
  return response.json();
};

// Get Data City
export const getCity = async () => {
  const response = await fetch(`${url}/api/city`);
  return response.json();
};

// Get Data Villain
export const getVillains = async () => {
  const response = await fetch(`${url}/api/villain`);
  return response.json();
};

// Get Data Selected Villain
export const getSelectedVillain = async (villainId:string) => {
  const response = await fetch(`${url}/api/villain/${villainId}`);
  return response.json();
};

// Post Fight Data
export const postFight = async (payload:ModalBattlePayload) => {
  const response = await fetch(`${url}/api/fight`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};
