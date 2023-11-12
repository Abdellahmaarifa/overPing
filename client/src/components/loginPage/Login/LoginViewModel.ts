import { useUserContext } from "context/user.context";
import { sleep, useStateWithGetSet } from "helpers";
import { toast } from "react-hot-toast";
import {
  LoginModelType,
  LoginViewModelType,
  LoginViewState,
} from "types/Login.type";
import { useLoginMutation } from "../../../graphql";
import { LoginModel } from "./LoginModel";
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
        //console.log(data);
        const accessToken = data?.login?.accessToken;
        resolve(accessToken);

        await sleep(500);

        this.userContext.signIn({ token: accessToken ? accessToken : null });
      } catch (err) {
        //console.log(err);
        reject("Email or Password is incorrect!");
      }
    });
  }
}

export default LoginViewModel;
