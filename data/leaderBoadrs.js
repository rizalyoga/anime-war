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
