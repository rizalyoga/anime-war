const url: string | undefined = process.env.NEXT_PUBLIC_APP_LINK_API_2;

export const newGameTag = async (payload: any, token: string | undefined) => {
  const response = await fetch(`${url}/gametags`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(payload),
  });

  return response.json();
};
