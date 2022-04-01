const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const PROFILE = "profile";

const setUserLoggedIn = (token, refresh_token) => {
  let temp = token ? localStorage.setItem(ACCESS_TOKEN_KEY, token) : null;
  temp = refresh_token
    ? localStorage.setItem(REFRESH_TOKEN_KEY, refresh_token)
    : null;
};
const setUserProfile = (profile) => {
  localStorage.setItem(PROFILE, profile);
};

const getUserProfile = () => {
  return localStorage.getItem(PROFILE);
};

const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

const setUserLoggedOut = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(PROFILE);
};

export {
  setUserLoggedIn,
  setUserLoggedOut,
  getAccessToken,
  getRefreshToken,
  setUserProfile,
  getUserProfile
};
