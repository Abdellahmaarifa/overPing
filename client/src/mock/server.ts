import express from "express";
import { Users } from "./db";
// CONSTANTS
const PORT = 9000;
const URL = `http://localhost:${PORT}`;

(async () => {
  const app = express();
  // TEST IF APP IS WORKIN
  app.get("/", (_req, res) => {
    res.send("hello overping");
  });

  // CREATING A USER
  const usr = await Users.create({
    id: "1",
    email: "test@gmail.com",
    password: "test",
  });
  app.listen(PORT, () => console.log(`[app] running at ${URL}`));
})();
