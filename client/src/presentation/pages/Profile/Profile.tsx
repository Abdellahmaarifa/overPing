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
  GetFriendshipStatusDocument,
  AccountDocument,
  useAccountQuery,
  useFindProfileByUserIdQuery,
  UnfriendUserDocument,
} from "gql/index";
import { useUserContext } from "context/user.context";
import { ProfileType } from "domain/model/Profile.type";
import { useNavigate, useParams } from "react-router-dom";
import { GetUserProfile } from "helpers/index";
import { useApolloClient } from "@apollo/client";
import { FriendshipStatusType } from "domain/model/helpers.type";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const [showExtraMenu, setShowExtraMenu] = useState(false);
  const { user, profile } = useUserContext();
  const [userProfile, setUserProfile] = useState<ProfileType | null>(profile);
  const navigate = useNavigate();
  const client = useApolloClient();
  const [friendsStatus, setFriendStatus] =
    useState<FriendshipStatusType | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const id = useParams()?.id;
  //let isLoading = false;
  // get other user profile

  useEffect(() => {
    if (id != user?.id) {
      client
        .query({
          query: AccountDocument,
          variables: {
            userId: Number(id),
          },
          fetchPolicy: "no-cache",
        })
        .then((data) => {
          console.log("gettign the data: ", data);

          client
            .query({
              query: GetFriendshipStatusDocument,
              variables: {
                userId: Number(user?.id),
                friendId: Number(id),
              },
              fetchPolicy: "no-cache",
            })
            .then((data) => {
              console.log("relation: ", data);
              //if (data?.data?.getFriendship?.status === "BLOCKED") navigate("/error");
              if (!data?.data?.getFriendshipStatus) setFriendStatus(null);
              else setFriendStatus(data?.data?.getFriendshipStatus?.status);
              setIsLoading(false);
              // if the relation is blocked it should redirect to error page
            })
            .catch((err) => {
              console.log(err);
            });
          setUserProfile(GetUserProfile(data?.data));
        })
        .catch((err) => {
          console.log(err);
          navigate("/error");
        });
    } else setIsLoading(false);
  }, [id]);

  // console.log("this is the profile: ", profile);
  //
  console.log("this is the final profile: ", userProfile);

  const blockUser = async () => {
    await toast.promise(
      client.mutate({
        mutation: BlockUserDocument,
        variables: {
          blockedUserId: Number(id),
        },
      }),
      {
        loading: "please wait..",
        success: (data) => {
          console.log(data);
          setShowExtraMenu(false);
          navigate("/friends?filter=blocked");
          return "user blocked successfuly!";
        },
        error: (err) => {
          console.log(err);
          setShowExtraMenu(false);
          return "something went wrong.";
        },
      }
    );
    //window.location.replace("/friends?filter=blocked");
  };

  const removeFriend = async () => {
    await toast.promise(
      client.mutate({
        mutation: UnfriendUserDocument,
        variables: {
          friendId: Number(id),
        },
      }),
      {
        loading: "please wait..",
        success: (data) => {
          console.log(data);
          setShowExtraMenu(false);
          return "your request is done successfuly";
        },
        error: (err) => {
          console.log(err);
          setShowExtraMenu(false);
          return "something went wrong.";
        },
      }
    );
  };

  console.log("relation", friendsStatus);
  if (isLoading) return <h1>loading..</h1>;
  return (
    <ProfileConatiner>
      <div tw="w-full relative max-w-[1126px] min-w-[300px]">
        <ProfileBanner
          showExtraMenu={showExtraMenu}
          setShowExtraMenu={setShowExtraMenu}
          isUserProfile={id === user?.id}
          profile={userProfile}
          friendsStatus={friendsStatus}
          id={Number(id)}
          setFriendStatus={setFriendStatus}
        />

        {showExtraMenu && (
          <ExtraMenu>
            {friendsStatus !== "BLOCKED" && friendsStatus !== "BLOCKED_BY" && (
              <ExtraLink onClick={() => blockUser()}>Block user</ExtraLink>
            )}
            {friendsStatus === "FRIENDS" && (
              <ExtraLink onClick={() => removeFriend()}>
                remove friend
              </ExtraLink>
            )}
          </ExtraMenu>
        )}
      </div>
      {/*showFriendList && <FriendList />*/}
      <ProfileBioInfo profile={userProfile} />
      <Toaster position="top-center" />
    </ProfileConatiner>
  );
};
export default Profile;
