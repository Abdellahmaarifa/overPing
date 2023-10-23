import { Entity } from "fakebase";
import { Int, Field, ObjectType } from "type-graphql";

export interface UserT extends Entity {
  id: string;
  email: string;
  password: string;
}
