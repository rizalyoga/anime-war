export let loadings = true;

// const url = process.env.NEXT_PUBLIC_APP_LINK_API;
const url = "https://materi-thrive-demo.vercel.app";

// Get Data Hero
export const getAllData = async () => {
  const response = await fetch(`${url}/api/hero`);
  return response.json();
};

// Get Data Skill
export const getSkill = async (characterId) => {
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
export const getSelectedVillain = async (villainId) => {
  const response = await fetch(`${url}/api/villain/${villainId}`);
  return response.json();
};

// Post Fight Data
export const postFight = async (payload) => {
  const response = await fetch(`${url}/api/fight`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return response.json();
};
