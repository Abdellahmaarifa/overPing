import {
  TopNavBarModelType,
  TopNavBarViewModelType,
} from "domain/model/TopNavBar.type";
import {
  useGetUserQuery,
  GetUserQueryHookResult,
  GetUserQuery,
} from "gql/index";
import { useUserContext, Context } from "context/user.context";
import { useLogoutMutation } from "gql/index";
import { useNavigate } from "react-router-dom";

class TopNavBarViewModel implements TopNavBarViewModelType {
  userQuery: GetUserQueryHookResult;
  userContext: Context;
  logoutMutation: any;
  navigate: any;

  constructor() {
    this.userQuery = useGetUserQuery();
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
