import express from "express";
import { Users } from "./db";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./userResolver";
import { buildSchema } from "type-graphql";
// CONSTANTS
const PORT = 9000;
const URL = `http://localhost:${PORT}`;

(async () => {
  const app = express();
  // TEST IF APP IS WORKIN
  app.get("/", (_req, res) => {
    res.send("hello overping");
  });

  // CREATE APPOLO SERVER
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app } as any);
  // CREATING A USER
  const usr = await Users.create({
    id: "1",
    email: "test@gmail.com",
    password: "test",
  });
  app.listen(PORT, () => console.log(`[app] running at ${URL}`));
})();
