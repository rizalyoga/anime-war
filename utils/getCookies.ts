import Cookies from "js-cookie";

const getToken = () => {
  let token: string | undefined = Cookies.get("userAuth");
  return token;
};

export default getToken;
