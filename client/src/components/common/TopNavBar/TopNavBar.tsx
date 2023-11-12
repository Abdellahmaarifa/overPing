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
import { useLayoutContext } from "context/layout.context";
import Skeleton from "react-loading-skeleton";
import { useSettingsContext } from "context/settings.context";

const NavLink = tw.div`flex justify-center items-center h-[24px] md:w-[48px] md:h-[48px]`;
const TopNavBar = () => {
  const { userMenuState, mobileMenuState } = useLayoutContext();
  const [openMobileMenu, setOpenMobileMenu] = mobileMenuState;
  const [openSettings, setOpenSettings] = userMenuState;
  const [_cookie, setCookie, removeCookie] = useCookies();
  const viewModel = new ViewModel();
  const { data, loading, error } = viewModel.userQuery;
  const {
    settingsModel: [_settingsModel, setSettingsModel],
  } = useSettingsContext();
  if (error) console.log(error);
  return (
    <TopNavBarContainer onClick={() => setOpenSettings(false)}>
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
        <MobileMenuIcon
          onClick={() => {
            setOpenMobileMenu(!openMobileMenu);
          }}
        >
          <MobileMenuIconElm elm="1" open={openMobileMenu} />
          <MobileMenuIconElm elm="2" open={openMobileMenu} />
          <MobileMenuIconElm elm="3" open={openMobileMenu} />
          <MobileMenuIconElm elm="4" open={openMobileMenu} />
        </MobileMenuIcon>
        <UserBoxSeparator></UserBoxSeparator>
        {/* USER STATUS BOX */}
        <UserBox
          onClick={(e) => {
            setOpenSettings(!openSettings);
            e.stopPropagation();
            console.log(e);
          }}
        >
          <UserImage>
            {loading ? (
              <Skeleton
                width={50}
                height={50}
                style={{ top: "0", position: "absolute" }}
              />
            ) : (
              <img src={data?.user.profilePhoto} alt="" tw="w-full h-full" />
            )}
          </UserImage>
          <UserInfo>
            <UserInfoNameConatiner>
              <UserInfoName>
                {loading ? <Skeleton height={10} /> : data?.user.userName}
              </UserInfoName>
              <UserInfoIcon>
                <DownArrowIcon />
              </UserInfoIcon>
            </UserInfoNameConatiner>
            <UserInfoStatusConatiner>
              {loading ? (
                <Skeleton height={8} width={50} />
              ) : (
                <>
                  <UserInfoStatusIcon></UserInfoStatusIcon>
                  <UserInfoStatus>Online</UserInfoStatus>
                </>
              )}
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
            <UserBoxMenuItem
              onClick={() => {
                setSettingsModel(true);
              }}
            >
              <UserBoxMenuItemText>Settings</UserBoxMenuItemText>
              <SettingsIcon />
            </UserBoxMenuItem>
            <UserBoxMenuItem onClick={viewModel.logout}>
              <UserBoxMenuItemText style={{ color: "#8E3928" }}>
                Logout
              </UserBoxMenuItemText>
              <LogoutIcon style={{ fill: "#8E3928" }} />
            </UserBoxMenuItem>
          </UserBoxMenu>
        </UserBox>
      </UserBoxConatiner>
    </TopNavBarContainer>
  );
};
export default TopNavBar;
