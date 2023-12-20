import {InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';

@InputType()
export class JoinMatchmakingInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  readonly userId: number

  @Field()
  @IsString()
  @IsNotEmpty()
  readonly matchType: string
}