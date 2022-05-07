export const newGameTag = async (payload, token) => {
  const resp = await fetch(`https://thrive-project-be.herokuapp.com/gametags`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  const data = await resp.json();
  return data;
};
