import {
  TopNavBarModelType,
  TopNavBarViewModelType,
} from "types/TopNavBar.type";
import { useUserQuery, UserQueryHookResult, UserQuery } from "gql";
import { useUserContext, Context } from "context/user.context";
import { useLogoutMutation } from "gql";
import { useNavigate } from "react-router-dom";

class TopNavBarViewModel implements TopNavBarViewModelType {
  userQuery: UserQueryHookResult;
  userContext: Context;
  logoutMutation: any;
  navigate: any;
  constructor() {
    this.userQuery = useUserQuery();
    this.userContext = useUserContext();
    [this.logoutMutation] = useLogoutMutation();
    this.navigate = useNavigate();
  }
  logout = async () => {
    this.userContext.signOut();
    window.location.replace("/login");
    await this.logoutMutation();
  };

  showProfile = () => {
    this.navigate(`/profile/${this.userQuery.data?.user.id}`);
  };
}

export default TopNavBarViewModel;
