import FriendList from "components/profilePage/FriendList/FriendList";
import ProfileBanner from "components/profilePage/ProfileBanner/ProfileBanner";
import {
  ExtraLink,
  ExtraMenu,
} from "components/profilePage/ProfileBanner/ProfileBanner.style";
import ProfileBioInfo from "components/profilePage/ProfileInfo/ProfileInfo";
import { useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { ProfileConatiner } from "./Profile.style";
import tw from "twin.macro";
const Profile = () => {
  const [showFriendList, setShowFriendList] = useState(false);
  const [showExtraMenu, setShowExtraMenu] = useState(false);
  return (
    <ProfileConatiner>
      <div tw="w-full relative max-w-[1126px] min-w-[300px]">
        <ProfileBanner
          showFriendsList={showFriendList}
          setShowFriendsList={setShowFriendList}
          showExtraMenu={showExtraMenu}
          setShowExtraMenu={setShowExtraMenu}
        />

        {showExtraMenu && (
          <ExtraMenu>
            <ExtraLink>Block friend</ExtraLink>
            <ExtraLink>remove friend</ExtraLink>
          </ExtraMenu>
        )}
      </div>
      {showFriendList && <FriendList />}
      <ProfileBioInfo />
    </ProfileConatiner>
  );
};
export default Profile;
