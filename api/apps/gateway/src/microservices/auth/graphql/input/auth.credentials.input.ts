import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class AuthCredentialsInput {
  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  username: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;
}
