import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class TwoFActorAuthInput {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  code: string;
}
