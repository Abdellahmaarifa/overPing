import { Context } from "context/user.context";
import {
  GetOnlineUsersLazyQueryHookResult,
  GetUserQueryHookResult,
} from "gql/index";
export interface TopNavBarModelType {
  id: string;
  username: string;
  profilePhoto: string;
}

export interface TopNavBarViewModelType {
  userQuery: GetUserQueryHookResult;
  userContext: Context;
}
