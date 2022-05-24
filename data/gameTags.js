export const newGameTag = async (payload, token) => {
  const response = await fetch(`https://thrive-project-be.herokuapp.com/gametags`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  return response.json();
};
