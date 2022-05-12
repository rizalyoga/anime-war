import Cookies from "js-cookie";

/* -------------------------------- Register Account -------------------------------- */
const inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000);

export const registerAccount = async (payload) => {
  const response = await fetch("https://thrive-project-be.herokuapp.com/auth/local/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.user?.confirmed === true) {
    let auththentication = true;
    // localStorage.setItem("userAuth", data.jwt);
    Cookies.set("userAuth", data.jwt, {
      expires: inTwoHours,
    });

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
    // localStorage.setItem("userAuth", data.jwt);
    Cookies.set("userAuth", data.jwt, {
      expires: inTwoHours,
    });
    Cookies.set("username", data.user?.username, {
      expires: inTwoHours,
    });

    // localStorage.setItem("username", data.user?.username);
    if (data.user.gametag?.name) {
      localStorage.setItem("nickname", data.user?.gametag?.name);
      localStorage.setItem("nicknameId", data.user?.gametag?.id);
    }

    return auththentication;
  } else {
    return <p style={{ color: "red" }}>{data.message[0].messages[0].message}</p>;
  }
};
