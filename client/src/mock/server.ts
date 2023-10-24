import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import { buildSchema } from "type-graphql";
import { sendRefreshToken } from "./auth";
import { UserResolver } from "./userResolver";
import cors from "cors";

// CONSTANTS
const PORT = 9000;
const URL = `http://localhost:${PORT}`;

(async () => {
  const app = express();
  /*
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  */
  app.use(cookieParser());
  // TEST IF APP IS WORKIN
  app.get("/", (_req, res) => {
    res.send("hello overping");
  });

  // GET A REFRECH TOKEN
  app.post("/refresh_token", async (req, res) => sendRefreshToken(req, res));

  // CREATE APPOLO SERVER
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app } as any);
  app.listen(PORT, () => console.log(`[app] running at ${URL}`));
})();
