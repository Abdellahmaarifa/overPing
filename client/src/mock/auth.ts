import jwt from "jsonwebtoken";
import { UserT } from "./entity/UserT";
import { JWT_SECRET_TOKEN, JWT_SECRET_REFRECH_TOKEN } from "./constant";
export const createAccessToken = (user: UserT) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET_TOKEN, { expiresIn: "15m" });
};

export const createRefrechToken = (user: UserT) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET_REFRECH_TOKEN, {
    expiresIn: "7d",
  });
};
