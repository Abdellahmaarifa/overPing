import { Field, ObjectType, ID } from "@nestjs/graphql";


@ObjectType()
export class GQLUserModel {
    @Field(() => ID)
    id: number;

    @Field()
    username: string;

    @Field()
    email?: string;

  @Field()
    profileImgUrl: string;
    
    @Field({ nullable: true })
    googleId?: string;

    @Field({ nullable: true })
    fortyTwoId?: string;

    @Field()
    twoStepVerificationEnabled?: boolean;

    @Field({nullable: true })
    showUpdateWin?: boolean;
  }
  
