export const expVillainCheck = (villainHP) => {
  if (villainHP >= 70) {
    return "repeating-linear-gradient(135deg, #fa68a2, #fa68a2 20px, #19baeb 20px, #19baeb 40px)";
  } else if (villainHP >= 40) {
    return "repeating-linear-gradient(135deg, #fab668, #fab668 20px, #ebc519 20px, #ebc519 40px)";
  } else if (villainHP <= 30) {
    return "repeating-linear-gradient(135deg, #a80226, #a80226 20px, #ff3f39 20px, #ff3f39 40px)";
  }
};
export const expHeroCheck = (heroHP) => {
  if (heroHP >= 70) {
    return "repeating-linear-gradient(135deg, #fa68a2, #fa68a2 20px, #19baeb 20px, #19baeb 40px)";
  } else if (heroHP >= 40) {
    return "repeating-linear-gradient(135deg, #fab668, #fab668 20px, #ebc519 20px, #ebc519 40px)";
  } else if (heroHP <= 30) {
    return "repeating-linear-gradient(135deg, #a80226, #a80226 20px, #ff3f39 20px, #ff3f39 40px)";
  }
};
