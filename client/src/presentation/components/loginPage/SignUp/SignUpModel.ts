import Validate from "../../../../domain/validation";
import { SignUpModelType } from "types/SignUp.type";
import * as Yup from "yup";
export class SignUpModel implements SignUpModelType {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  constructor() {
    this.username = "";
    this.email = "";
    this.password = "";
    this.passwordConfirmation = "";
  }
}

export const SignUpModelSchema = () => {
  return Yup.object({
    username: Validate.username(),
    email: Validate.email(),
    password: Validate.password(),
    passwordConfirmation: Validate.passwordConfirmation("password"),
  });
};
