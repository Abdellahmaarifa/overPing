import { useUserContext } from "context/user.context";
import { sleep, useStateWithGetSet } from "helpers";
import { toast } from "react-hot-toast";
import {
  LoginModelType,
  LoginViewModelType,
  LoginViewState,
} from "types/Login.type";
import { useLoginMutation } from "gql";
import { LoginModel } from "./LoginModel";
import { Navigate } from "react-router-dom";

class LoginViewModel implements LoginViewModelType {
  data: LoginModel;
  loginMutation: any;
  userContext: any;
  state: LoginViewState;

  constructor() {
    this.data = new LoginModel();
    [this.loginMutation] = useLoginMutation();
    this.userContext = useUserContext();
    this.state = {
      error: useStateWithGetSet<"valid" | "invalid" | undefined>(undefined),
      showPass: useStateWithGetSet(false),
    };
  }

  handleSubmit = async (values: LoginModelType) => {
    this.data = values;
    try {
      await toast.promise(this.loginUser(), {
        loading: "Loading",
        success: (data) => {
          this.state.error.set("valid");
          return `Good To see you again!`;
        },
        error: (err) => {
          this.state.error.set("invalid");
          return err;
        },
      });
    } catch (_err) {
      //console.log(err);
    }
  };

  private async loginUser() {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.data.email === "") {
          reject("Please provide your email address.");
          return;
        }

        if (this.data.password === "") {
          reject("Please provide your password.");
          return;
        }

        await sleep(500);
        const { data } = await this.loginMutation({
          variables: {
            email: this.data.email,
            password: this.data.password,
          },
        });
        console.log("after you logged in : ", data.signIn);
        resolve(data.signIn);

        await sleep(500);
        window.location.replace("/");
        // this.userContext.signIn({
        //   id: data.signIn.id,
        //   username: data.signIn.username,
        // });
      } catch (err: any) {
        console.log("comes from the server: ", err);
        if (
          err?.message ==
          "Two-factor authentication is required. Please provide the 2FA code."
        ) {
          // try 2factor auth:
          window.location.replace("/login?step=verification");
        }
        reject("Email or Password is incorrect!");
      }
    });
  }
}

export default LoginViewModel;
