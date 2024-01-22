export const AUTH = {
  token: "access_token",
  user: "user",
};

export const SERVER_URL = import.meta.env.DEV
  ? import.meta.env.OVER_PING_SERVER_URL_DEV
  : import.meta.env.OVER_PING_SERVER_URL_PROD;

export const SERVER_END_POINT = `${SERVER_URL}/graphql`;
export const SERVER_REFRESH_END_POINT = `${SERVER_URL}/auth/refresh`;
