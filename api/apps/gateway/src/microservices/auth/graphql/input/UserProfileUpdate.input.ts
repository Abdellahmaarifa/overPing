import { Field, InputType } from '@nestjs/graphql';
import {
  IsNumber,
} from 'class-validator';

@InputType()
export class UserProfileUpdateInput {
  @Field()
  @IsNumber()
  id: number

  @Field()
  @IsNumber()
  profileId: number;

  
}
