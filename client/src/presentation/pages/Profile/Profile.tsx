import FriendList from "components/profilePage/FriendList/FriendList";
import ProfileBanner from "components/profilePage/ProfileBanner/ProfileBanner";
import {
  ExtraLink,
  ExtraMenu,
} from "components/profilePage/ProfileBanner/ProfileBanner.style";
import ProfileBioInfo from "components/profilePage/ProfileInfo/ProfileInfo";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { ProfileConatiner } from "./Profile.style";
import tw from "twin.macro";
import {
  BlockUserDocument,
  useAccountQuery,
  useFindProfileByUserIdQuery,
} from "gql/index";
import { useUserContext } from "context/user.context";
import { ProfileType } from "domain/model/Profile.type";
import { useNavigate, useParams } from "react-router-dom";
import { GetUserProfile } from "helpers/index";
import { useApolloClient } from "@apollo/client";

const Profile = () => {
  const [showExtraMenu, setShowExtraMenu] = useState(false);
  const navigate = useNavigate();
  const client = useApolloClient();
  // const [isLoading, setIsLoading] = useState(true);
  let { user, profile } = useUserContext();
  const id = useParams()?.id;
  let isLoading = false;
  // get other user profile
  if (id != user?.id) {
    const { data, loading, error } = useAccountQuery({
      variables: {
        userId: Number(id),
      },
    });
    isLoading = loading;

    if (data) {
      // create profile from the data
      profile = GetUserProfile(data);
    } else {
      // error getting data? maybe the user is not exist??
      navigate("/error");
    }
  }

  if (isLoading) return <h1>loading..</h1>;
  // console.log("this is the profile: ", profile);
  //
  console.log("this is the final profile: ", profile);

  const blockUser = () => {
    client
      .mutate({
        mutation: BlockUserDocument,
        variables: {
          userId: Number(user?.id),
          friendId: Number(id),
        },
      })
      .then((data) => {
        // if the user blocked you should refrech the page
      })
      .catch((err) => console.log("you can't", err));
  };

  return (
    <ProfileConatiner>
      <div tw="w-full relative max-w-[1126px] min-w-[300px]">
        <ProfileBanner
          showExtraMenu={showExtraMenu}
          setShowExtraMenu={setShowExtraMenu}
          isUserProfile={id === user?.id}
          profile={profile}
        />

        {showExtraMenu && (
          <ExtraMenu>
            <ExtraLink onClick={() => blockUser()}>Block friend</ExtraLink>
            <ExtraLink>remove friend</ExtraLink>
          </ExtraMenu>
        )}
      </div>
      {/*showFriendList && <FriendList />*/}
      <ProfileBioInfo profile={profile} />
    </ProfileConatiner>
  );
};
export default Profile;
