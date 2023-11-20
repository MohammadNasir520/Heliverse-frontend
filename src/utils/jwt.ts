import { jwtDecode } from "jwt-decode";
import { authKey, getFromLocalStorage } from "./localStorage";

export const decodeJwtToken = (token: string) => {
  return jwtDecode(token);
};

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    return decodeJwtToken(authToken);
  } else {
    return "";
  }
};
