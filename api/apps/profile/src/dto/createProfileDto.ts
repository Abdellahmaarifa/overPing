import { IsNumber, IsString } from "class-validator";

export class CreateProfileDto {
  userId: number;
  username: string;
}