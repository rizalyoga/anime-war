import Cookies from "js-cookie";

const getToken = () => {
  let token = Cookies.get("userAuth");
  return token;
};

export default getToken;
