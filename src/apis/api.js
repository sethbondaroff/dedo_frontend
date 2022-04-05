import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setUserLoggedIn,
} from "../helpers/authHelpers";
import { API_URL } from "../config/constants";

const API = axios.create({ baseURL: API_URL });

const isTokenExpired = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const { exp } = JSON.parse(jsonPayload);
  const expired = Date.now() >= exp * 1000;

  return expired;
};

API.interceptors.request.use((req) => {
  var token = getAccessToken();

  if (token) {
    console.log(isTokenExpired(token));
    if (isTokenExpired(token)) {
      let refreshToken = getRefreshToken();
      axios
        .post(
          `${API_URL}/v1/token/refresh`,
          {
            refresh: refreshToken,
          },
          {
            Authorization: `Bearer ${refreshToken}`,
          }
        )
        .then((response) => {
          setUserLoggedIn(response.data.access, null);
        });
    }

    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export { API };
