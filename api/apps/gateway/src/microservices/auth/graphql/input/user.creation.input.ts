
import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class UserCreationIput {
  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  username: string;

  @Field()
  @IsString()
  @IsEmail()
  @MinLength(8)
  @MaxLength(30)
  email: string;

  @Field()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
