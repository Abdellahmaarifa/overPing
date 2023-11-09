import tw from "twin.macro";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProfileBanner from "components/profilePage/ProfileBanner/ProfileBanner";
import { ProfileConatiner } from "./Profile.style";
import FriendList from "components/profilePage/FriendList/FriendList";
import ProfileBioInfo from "components/profilePage/ProfileInfo/ProfileInfo";
const Profile = () => {
  return (
    <ProfileConatiner>
      <ProfileBanner />
      <FriendList />
      <ProfileBioInfo />
    </ProfileConatiner>
  );
};
export default Profile;
