import { useState } from "react";
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

const NavLink = tw.div`flex justify-center items-center h-[24px] md:w-[48px] md:h-[48px]`;
const TopNavBar = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
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
          <UserImage></UserImage>
          <UserInfo>
            <UserInfoNameConatiner>
              <UserInfoName>Salma</UserInfoName>
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
            <UserBoxMenuItem>
              <UserBoxMenuItemText>View My Profile</UserBoxMenuItemText>
              <EyeIcon />
            </UserBoxMenuItem>
            <UserBoxMenuItem>
              <UserBoxMenuItemText>Settings</UserBoxMenuItemText>
              <SettingsIcon />
            </UserBoxMenuItem>
            <UserBoxMenuItem>
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
