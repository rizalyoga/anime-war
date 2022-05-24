import Cookies from "js-cookie";

const url = process.env.NEXT_PUBLIC_APP_LINK_API_2;

/* -------------------------------- Register Account -------------------------------- */
const inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000);

export const registerAccount = async (payload) => {
  const response = await fetch(`${url}/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.user?.confirmed === true) {
    let auththentication = true;
    Cookies.set("userAuth", data.jwt, {
      expires: inTwoHours,
    });
    Cookies.set("username", data.user?.username, {
      expires: inTwoHours,
    });

    return auththentication;
  } else {
    return <p style={{ color: "red" }}>{data.message[0].messages[0].message}</p>;
  }
};

/* -------------------------------- Login Account -------------------------------- */
export const loginAccount = async (payload) => {
  const response = await fetch(`${url}/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.user?.confirmed === true) {
    let auththentication = true;

    Cookies.set("userAuth", data.jwt, {
      expires: inTwoHours,
    });
    Cookies.set("username", data.user?.username, {
      expires: inTwoHours,
    });

    if (data.user.gametag?.name) {
      localStorage.setItem("nickname", data.user?.gametag?.name);
      localStorage.setItem("nicknameId", data.user?.gametag?.id);
    }

    return auththentication;
  } else {
    return <p style={{ color: "red" }}>{data.message[0].messages[0].message}</p>;
  }
};
