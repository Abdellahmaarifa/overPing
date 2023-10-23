import "reflect-metadata";
import { Resolver, Query, ObjectType } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello, World 🌎";
  }
}
