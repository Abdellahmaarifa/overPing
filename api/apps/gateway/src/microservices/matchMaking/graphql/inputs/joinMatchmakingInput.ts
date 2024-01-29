import {InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class JoinMatchmakingInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly matchType: string
}

@InputType()
export class RequestToPlayInput {
  @Field()
  @IsNumber()
  @IsNotEmpty()
  readonly recipientId: number

  
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly matchType: string
}