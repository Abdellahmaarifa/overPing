import { StateWithGetSet } from "./helpers.type";
export interface LoginModelType {
  email: string;
  password: string;
}

export interface LoginViewState {
  error: StateWithGetSet<string>;
  showPass: StateWithGetSet<boolean>;
}

export interface LoginViewModelType {
  data: LoginModelType;
  loginMutation: any;
  userContext: any;
  state: LoginViewState;
}
