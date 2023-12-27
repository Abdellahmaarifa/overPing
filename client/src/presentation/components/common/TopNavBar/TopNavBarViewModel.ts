import {
  TopNavBarModelType,
  TopNavBarViewModelType,
} from "domain/model/TopNavBar.type";
import { useUserQuery, UserQueryHookResult, UserQuery } from "gql/index";
import { useUserContext, Context } from "context/user.context";
import { useLogoutMutation } from "gql/index";
import { useNavigate } from "react-router-dom";

class TopNavBarViewModel implements TopNavBarViewModelType {
  userQuery: UserQueryHookResult;
  userContext: Context;
  logoutMutation: any;
  navigate: any;

  constructor() {
    this.userQuery = useUserQuery({
      variables: {
        id: 1,
      },
    });
    this.userContext = useUserContext();
    [this.logoutMutation] = useLogoutMutation();
    this.navigate = useNavigate();
  }
  logout = async () => {
    this.userContext.signOut();

    //window.location.replace("/login");
    this.navigate("/login");
    await this.logoutMutation({
      variables: {
        id: Number(this.userContext.user?.id),
      },
    });
  };

  showProfile = () => {
    console.log();
    this.navigate(`/profile/${this.userContext.user?.id}`);
  };
}

export default TopNavBarViewModel;
