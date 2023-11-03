import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class GQLUserModel {
    @Field()
    id: number;
    @Field()
    username: string;
  }
  