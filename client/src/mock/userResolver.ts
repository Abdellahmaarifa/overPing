import { compare, hash } from "bcrypt";
import "reflect-metadata";

import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload-ts";
import fs from "fs"; // Import the Node.js File System module for saving files
import { v4 as uuidv4 } from "uuid";
import { createAccessToken, createRefrechToken } from "./auth";
import { AuthContext } from "./authContext";
import { COOKIE_NAME } from "./constant";
import { User } from "./db";
import { isAuth } from "./isAuth";

@ObjectType()
class LoginResponse {
  @Field(() => String)
  accessToken!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => String)
  id!: string;
  @Field(() => String)
  email!: string;
  @Field(() => String)
  userName!: string;
  @Field(() => String)
  profilePhoto!: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello, World 🌎";
  }

  // ONLY LOGGED IN USERS CAN HIT THIS ROUTE
  @Query(() => String)
  @UseMiddleware(isAuth)
  home(@Ctx() { payload }: AuthContext) {
    return `you are in your home and you id is : ${payload?.userId}`;
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
    res.cookie(COOKIE_NAME, createRefrechToken(user), {
      httpOnly: false,
    });
    return {
      accessToken: createAccessToken(user),
    };
  }

  // REGISTER A NEW USER
  @Mutation(() => Boolean)
  async register(
    @Arg("email", () => String) email: string,
    @Arg("password", () => String) password: string,
    @Arg("userName", () => String) userName: string,
    @Arg("profilePhoto", () => GraphQLUpload) profilePhoto: FileUpload // Use GraphQLUpload for the file input
  ) {
    const hashedPass = await hash(password, 12);
    try {
      const user = await User.findOne((usr) => usr.email == email);
      if (user) throw new Error("Ops. User with that email already exist.");

      const { createReadStream, filename, mimetype } = await profilePhoto;
      const uniqueFileName = `${uuidv4()}-${filename}`; // Generate a unique filename
      const fileStoragePath = `data/uploads/${uniqueFileName}`;

      const fileStream = createReadStream();

      const writeStream = fs.createWriteStream(fileStoragePath);

      await new Promise((resolve, reject) => {
        fileStream
          .pipe(writeStream)
          .on("finish", resolve)
          .on("error", (error) => {
            fs.unlink(fileStoragePath, () => {
              reject(error);
            });
          });
      });

      await User.create({
        email,
        password: hashedPass,
        userName,
        profilePhoto: fileStoragePath,
      });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }

  @Query(() => UserResponse)
  @UseMiddleware(isAuth)
  async user(@Ctx() { payload }: AuthContext) {
    const id = payload.userId;
    const user = await User.findOne((usr) => usr.id === id);
    if (!user) {
      return {
        msg: "error, no user found!",
      };
    }
    return user;
  }
}
