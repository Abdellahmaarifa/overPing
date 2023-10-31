import { UserQueryHookResult } from "../graphql";
import { Context } from "context/user.context";
export interface TopNavBarModelType {
  id: string;
  username: string;
  profilePhoto: string;
}

export interface TopNavBarViewModelType {
  userQuery: UserQueryHookResult;
  userContext: Context;
}
