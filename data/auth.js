/* -------------------------------- Register Account -------------------------------- */
export const registerAccount = async (payload) => {
  const response = await fetch("https://thrive-project-be.herokuapp.com/auth/local/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.user?.confirmed === true) {
    let auththentication = true;
    localStorage.setItem("userAuth", data.jwt);
    localStorage.setItem("username", data?.user?.username);

    return auththentication;
  } else {
    return <p style={{ color: "red" }}>{data.message[0].messages[0].message}</p>;
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

  if (data.user?.confirmed === true) {
    let auththentication = true;
    localStorage.setItem("userAuth", data.jwt);
    localStorage.setItem("username", data.user?.username);
    if (data.user.gametag?.name) {
      localStorage.setItem("nickname", data.user?.gametag?.name);
    }

    return auththentication;
  } else {
    return <p style={{ color: "red" }}>{data.message[0].messages[0].message}</p>;
  }
};
