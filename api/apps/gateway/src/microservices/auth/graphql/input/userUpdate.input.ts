import { Field, InputType } from '@nestjs/graphql';
// import {
//   IsNumber,
// } from 'class-validator';

@InputType()
export class UpdateUserInput{
    @Field()
    email?: string;
    @Field()
    showUpdateWin?: boolean;
}