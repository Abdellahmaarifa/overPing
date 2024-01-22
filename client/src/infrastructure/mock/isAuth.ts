import jwt from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { AuthContext } from "./authContext";
import { JWT_SECRET_TOKEN } from "./constant";
export const isAuth: MiddlewareFn<AuthContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) throw new Error("not authenticated!!");
  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET_TOKEN);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("not authonticated!!!");
  }
  return next();
};
