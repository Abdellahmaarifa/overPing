import { useLoginContext } from "context/login.context";
import { FormikProps } from "formik";
import { sleep } from "helpers";
import { FormEvent } from "react";
import toast from "react-hot-toast";
import {
  SignUpModelType,
  SignUpViewModelType,
  SignUpViewState,
} from "types/SignUp.type";
import { useRegisterMutation } from "../../../graphql";
import { SignUpModel } from "./SignUpModel";

class SignUpViewModel implements SignUpViewModelType {
  data: SignUpModelType;
  state: SignUpViewState;
  registerMutation: any;
  loginContext: any;
  constructor(state: SignUpViewState) {
    this.data = new SignUpModel();
    this.loginContext = useLoginContext();
    this.state = state;
    [this.registerMutation] = useRegisterMutation();
  }

  getFieldState = (
    name: string,
    formikProps: FormikProps<SignUpModelType> | undefined
  ) => {
    if (formikProps === undefined) return undefined;
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
    return undefined;
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
    //console.log("emm");
    this.loginContext.setRegisterStep("prev");
  };

  handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
    formikProps: FormikProps<SignUpModelType>
  ) => {
    const { values, getFieldMeta } = formikProps;
    event.preventDefault();
    this.state.showPass.set(false);
    this.state.showPassConfirmation.set(false);

    this.data = values;
    //console.log("step: ", this.loginContext.registerStep);
    if (this.loginContext.registerStep === 1) {
      //console.log(getFieldMeta("email").error);
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
        //console.log("no way ", getFieldMeta("username").error);
        return;
      }
      //console.log("pas..");
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
        //console.log("not");
        return;
      }
      //console.log("passowrd ..");
    }
    if (this.loginContext.registerStep < 3) {
      this.loginContext.setRegisterStep("next");
    }
    //console.log("submited...");
    if (this.loginContext.registerStep === 3) {
      /*this.data.profilePhoto = (
        document.getElementsByName("avatar")[0] as any
      ).files[0];*/

      /*console.log(
        "now we are going to create the user!",
        document.getElementsByName("avatar")[0]
      );*/
      try {
        await toast.promise(this.registerUser(), {
          loading: "Loading",
          success: () => {
            this.loginContext.setShowRegister(false);
            this.loginContext.setRegisterStep("reset");
            return `Very Weelcome.`;
          },
          error: (err) => {
            //console.log(err);
            return err;
          },
        });
      } catch (err) {
        this.state.shake.set(true);

        setTimeout(() => {
          this.state.shake.set(false);
        }, 500);
      }
    }
  };

  // Register the user!
  private registerUser = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        // check is all the data is available here ...
        if (
          !this.data.username ||
          !this.data.email ||
          !this.data.password ||
          !this.data.passwordConfirmation
        ) {
          reject("Please make sure all the fields are not empty.");
        }
        if (this.data.password !== this.data.passwordConfirmation) {
          reject("Password is not the same.");
        }
        await sleep(500);
        //console.log("imag: ", this.data.profilePhoto);
        const {} = await this.registerMutation({
          variables: {
            profilePhoto: this.state.avatarFile.get,
            userName: this.data.username,
            password: this.data.password,
            email: this.data.email,
          },
        });
        resolve(true);
      } catch (err) {
        //console.log("image: ", this.data.profilePhoto);
        //console.log(err);
        reject("Something went wrong.");
      }
    });
  };
}

export default SignUpViewModel;
