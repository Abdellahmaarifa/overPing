import { useLoginContext } from "context/login.context";
import { FormikProps } from "formik";
import { FormEvent } from "react";
import {
  SignUpModelType,
  SignUpViewModelType,
  SignUpViewState,
} from "types/SignUp.type";
import { SignUpModel } from "./SignUpModel";

class SignUpViewModel implements SignUpViewModelType {
  data: SignUpModelType;
  state: SignUpViewState;
  loginContext: any;
  constructor(state: SignUpViewState) {
    this.data = new SignUpModel();
    this.loginContext = useLoginContext();
    this.state = state;
  }

  getFieldState = (
    name: string,
    formikProps: FormikProps<SignUpModelType> | undefined
  ) => {
    if (formikProps === undefined) return "";
    if ((formikProps?.values as any)[name]) {
      if (formikProps?.getFieldMeta(name)?.error) return "invalid";
      else return "valid";
    }
    if (
      ((name === "username" || name === "email") &&
        this.state.isEmailSubmitted.get) ||
      this.state.isPasswordSubmitted.get
    )
      return "invalid";
    return "";
  };
  handleFocus = (
    e: FormEvent<HTMLFormElement> & { target: { name: string } }
  ) => {
    this.state.fieldName.set(e.target.name);
  };

  closeModel = () => {
    this.loginContext.setRegisterStep("reset");
    this.loginContext.setShowRegister(false);
  };

  goBack = () => {
    console.log("emm");
    this.loginContext.setRegisterStep("prev");
  };

  handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    formikProps: FormikProps<SignUpModelType>
  ) => {
    const { values, getFieldMeta } = formikProps;
    event.preventDefault();
    this.data = values;

    console.log("step: ", this.loginContext.registerStep);
    if (this.loginContext.registerStep === 1) {
      console.log(getFieldMeta("email").error);
      if (
        getFieldMeta("username").error ||
        getFieldMeta("email").error ||
        !this.data.email ||
        !this.data.username
      ) {
        // nor validated!1
        this.state.isEmailSubmitted.set(true);
        this.state.shake.set(true);
        setTimeout(() => {
          this.state.shake.set(false);
        }, 500);
        console.log("no way ", getFieldMeta("username").error);
        return;
      }
      console.log("pas..");
    } else if (this.loginContext.registerStep === 2) {
      if (
        getFieldMeta("password").error ||
        getFieldMeta("passwordConfirmation").error ||
        !this.data.password ||
        !this.data.passwordConfirmation
      ) {
        // not validated
        this.state.isPasswordSubmitted.set(true);
        this.state.shake.set(true);
        setTimeout(() => {
          this.state.shake.set(false);
        }, 500);
        console.log("not");
        return;
      }
      console.log("passowrd ..");
    }
    if (this.loginContext.registerStep < 3) {
      this.loginContext.setRegisterStep("next");
    }
    console.log("submited...");
    if (this.loginContext.registerStep === 3) {
      console.log("now we are going to create the user!");
    }
  };
}

export default SignUpViewModel;
