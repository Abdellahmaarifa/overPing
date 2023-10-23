import { Entity } from "fakebase";
import { Int, Field, ObjectType } from "type-graphql";

export interface User extends Entity {
  id: string;
  email: string;
  password: string;
}
