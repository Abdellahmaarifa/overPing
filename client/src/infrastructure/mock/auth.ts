import jwt from "jsonwebtoken";
import { UserT } from "./entity/UserT";
import { JWT_SECRET_TOKEN, JWT_SECRET_REFRECH_TOKEN } from "./constant";
import { Request, Response } from "express";
import { COOKIE_NAME } from "./constant";
import { User } from "./db";
export const createAccessToken = (user: UserT) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET_TOKEN, { expiresIn: "15m" });
};

export const createRefrechToken = (user: UserT) => {
  return jwt.sign({ userId: user.id }, JWT_SECRET_REFRECH_TOKEN, {
    expiresIn: "7d",
  });
};

export const sendRefreshToken = async (req: Request, res: Response) => {
  const token = req.cookies?.[COOKIE_NAME];
  console.log("found: ", req.cookies);
  if (!token) {
    return res.send({ ok: false, accessToken: "" });
  }
  let payload: any = null;
  try {
    payload = jwt.verify(token, JWT_SECRET_REFRECH_TOKEN);
  } catch (err) {
    console.log(err);
    return res.send({ ok: false, accessToken: "" });
  }
  const user = await User.findOne((usr) => usr.id === payload.userId);
  if (!user) {
    return res.end({ ok: false, accessToken: "" });
  }
  console.log("coool!", createAccessToken(user));
  res.cookie(COOKIE_NAME, createRefrechToken(user), {
    httpOnly: true,
  });
  return res.send({ ok: true, accessToken: createAccessToken(user) });
};
