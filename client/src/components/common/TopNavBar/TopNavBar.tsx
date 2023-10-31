import { useState } from "react";
import { useCookies } from "react-cookie";
import tw from "twin.macro";
import BellIcon from "../../../assets/common/bell.svg?react";
import DownArrowIcon from "../../../assets/common/downArrow.svg?react";
import EyeIcon from "../../../assets/common/eye.svg?react";
import Logo from "../../../assets/common/logo.svg?react";
import LogoutIcon from "../../../assets/common/logout.svg?react";
import SettingsIcon from "../../../assets/common/settings.svg?react";
import {
  LogoContainer,
  MobileMenuIcon,
  MobileMenuIconElm,
  TopNavBarContainer,
  UserBox,
  UserBoxConatiner,
  UserBoxMenu,
  UserBoxMenuItem,
  UserBoxMenuItemText,
  UserBoxSeparator,
  UserImage,
  UserInfo,
  UserInfoIcon,
  UserInfoName,
  UserInfoNameConatiner,
  UserInfoStatus,
  UserInfoStatusConatiner,
  UserInfoStatusIcon,
} from "./TopNavBar.style";
import ViewModel from "./TopNavBarViewModel";

const NavLink = tw.div`flex justify-center items-center h-[24px] md:w-[48px] md:h-[48px]`;
const TopNavBar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [_cookie, setCookie, removeCookie] = useCookies();
  const viewModel = new ViewModel();
  const { data, loading, error } = viewModel.userQuery;

  if (loading) return <h1>loading....</h1>;
  if (error) console.log(error);
  return (
    <TopNavBarContainer>
      {/* Logo */}
      <LogoContainer>
        <Logo />
      </LogoContainer>
      {/* USER STATUS CONATINER*/}
      <UserBoxConatiner>
        <NavLink>
          <BellIcon />
        </NavLink>
        {/* MOBILE MENU  */}
        <MobileMenuIcon onClick={() => setOpenMobileMenu(!openMobileMenu)}>
          <MobileMenuIconElm elm="1" open={openMobileMenu} />
          <MobileMenuIconElm elm="2" open={openMobileMenu} />
          <MobileMenuIconElm elm="3" open={openMobileMenu} />
          <MobileMenuIconElm elm="4" open={openMobileMenu} />
        </MobileMenuIcon>
        <UserBoxSeparator></UserBoxSeparator>
        {/* USER STATUS BOX */}
        <UserBox onClick={() => setOpenSettings(!openSettings)}>
          <UserImage>
            <img src={data?.user.profilePhoto} alt="" tw="w-full h-full" />
          </UserImage>
          <UserInfo>
            <UserInfoNameConatiner>
              <UserInfoName>{data?.user.userName}</UserInfoName>
              <UserInfoIcon>
                <DownArrowIcon />
              </UserInfoIcon>
            </UserInfoNameConatiner>
            <UserInfoStatusConatiner>
              <UserInfoStatusIcon></UserInfoStatusIcon>
              <UserInfoStatus>Online</UserInfoStatus>
            </UserInfoStatusConatiner>
          </UserInfo>
          {/* USER STATUS MENU */}
          <UserBoxMenu
            style={openSettings ? { display: "flex" } : { display: "none" }}
          >
            <UserBoxMenuItem onClick={viewModel.showProfile}>
              <UserBoxMenuItemText>View My Profile</UserBoxMenuItemText>
              <EyeIcon />
            </UserBoxMenuItem>
            <UserBoxMenuItem>
              <UserBoxMenuItemText>Settings</UserBoxMenuItemText>
              <SettingsIcon />
            </UserBoxMenuItem>
            <UserBoxMenuItem onClick={viewModel.logout}>
              <UserBoxMenuItemText style={{ color: "#8E3928" }}>
                Logout
              </UserBoxMenuItemText>
              <LogoutIcon />
            </UserBoxMenuItem>
          </UserBoxMenu>
        </UserBox>
      </UserBoxConatiner>
    </TopNavBarContainer>
  );
};
export default TopNavBar;
