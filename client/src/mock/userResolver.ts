import "reflect-metadata";
import {
  Resolver,
  Query,
  ObjectType,
  Mutation,
  Arg,
  Ctx,
  Field,
} from "type-graphql";
import { hash, compare } from "bcrypt";
import { User } from "./db";
import { faker } from "@faker-js/faker";
import { AuthContext } from "./authContect";
import { createAccessToken, createRefrechToken } from "./auth";
import { COOKIE_NAME } from "./constant";
@ObjectType()
class LoginResponse {
  @Field(() => String)
  accessToken!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello, World 🌎";
  }

  // LOG IN THE USER
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Ctx() { res }: AuthContext
  ): Promise<LoginResponse> {
    const user = await User.findOne((usr) => usr.email == email);
    if (!user) {
      throw new Error("user not found");
    }
    const valid = await compare(password, user.password);
    if (!valid) throw new Error("pass wrong!");

    // loged in!
    res.cookie(COOKIE_NAME, createRefrechToken(user), { httpOnly: true });
    return {
      accessToken: createAccessToken(user),
    };
  }

  // REGISTER A NEW USER
  @Mutation(() => Boolean)
  async register(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string
  ) {
    const hashedPass = await hash(password, 12);
    try {
      const user = await User.findOne((usr) => usr.email == email);
      if (user) throw new Error("Ops. User with that email already exist.");
      await User.create({
        email,
        password: hashedPass,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
