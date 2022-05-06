/* -------------------------------- Register Account -------------------------------- */
export const registerAccount = async (payload) => {
  const response = await fetch("https://thrive-project-be.herokuapp.com/auth/local/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.statusCode == 400) {
    return <p style={{ color: "red" }}>{data.message[0].messages[0].message}</p>;
  } else {
    let auththentication = true;
    localStorage.setItem("userAuth", data.jwt);
    localStorage.setItem("username", data.user.username);
    return auththentication;
  }
};

/* -------------------------------- Login Account -------------------------------- */
export const loginAccount = async (payload) => {
  const response = await fetch("https://thrive-project-be.herokuapp.com/auth/local", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.statusCode == 400) {
    return <p style={{ color: "red" }}>{data.message[0].messages[0].message}</p>;
  } else {
    let auththentication = true;
    localStorage.setItem("userAuth", data.jwt);
    localStorage.setItem("username", data.user.username);
    return auththentication;
  }
};
