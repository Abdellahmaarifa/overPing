import { setupWorker, graphql } from "msw";

// JWT WILL NOT WORK CORRECTLY IN SERVICE WORKER!!

// import jwt from "jsonwebtoken";

// const JwtSecret = "jkdhflkjhsd";
// const JwtLifeTime = "20m";
/*
const createToken = (userId: any) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      {
        userId,
      },
      JwtSecret,
      {
        expiresIn: JwtLifeTime,
      },
      (error, token) => {
        if (error) {
          reject(error);
        }

        resolve(token);
      }
    );
  });
*/
const api = graphql.link("http://localhost:5173");
const worker = setupWorker(
  api.mutation("Login", async (req, res, ctx) => {
    const { email, password } = req.variables;

    if (email !== "test@gmail.com" || password !== "test") {
      return res(
        ctx.errors([
          {
            message: "The username and/or password you entered is incorrect.",
          },
        ])
      );
    }

    const userId = "623e4902515ee8bdb4553599";

    const token = "token-example";

    // console.log(token);

    return res(
      ctx.data({
        login: {
          user: {
            __typename: "User",
            id: userId,
            email,
            firstName: "John",
            lastName: "Doe",
          },
          token,
        },
      })
    );
  })
);
export default worker;
