import { Field, InputType } from "@nestjs/graphql";
import { isNumber, isString } from "class-validator";

@InputType()
export class AcceptRequestInput {
    @Field()
    readonly senderId: number;
    
    @Field()
    readonly matchType: string;
}