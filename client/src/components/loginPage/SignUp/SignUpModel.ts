import { validate } from "helpers";
import { SignUpModelType } from "types/SignUp.type";
import * as Yup from "yup";
export class SignUpModel implements SignUpModelType {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  profilePhoto: File | null;
  constructor() {
    this.username = "";
    this.email = "";
    this.password = "";
    this.passwordConfirmation = "";
    this.profilePhoto = null;
  }
}

export const SignUpModelSchema = () => {
  return Yup.object({
    username: validate.username(),
    email: validate.email(),
    password: validate.password(),
    passwordConfirmation: validate.passwordConfirmation("password"),
  });
};
