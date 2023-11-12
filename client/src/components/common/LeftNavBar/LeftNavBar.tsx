import HomeIcon from "assets/common/home.svg?react";

import ChatIcon from "assets/common/chat.svg?react";
import FriendsIcon from "assets/common/friends.svg?react";
import LeaderboardIcon from "assets/common/leaderboard.svg?react";
import LogoutIcon from "assets/common/logoutmenu.svg?react";
import TournamentIcon from "assets/common/tournament.svg?react";
import EyeIcon from "assets/common/eye.svg?react";
import SettingsIcon from "assets/common/settings.svg?react";

import { useUserContext } from "context/user.context";
import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../graphql";
import {
  ExitIcon,
  Nav,
  NavLink,
  NavbarContainer,
  Seperator,
} from "./LeftNavBar.style";
import { useLayoutContext } from "context/layout.context";
import { useEffect } from "react";
import tw, { css } from "twin.macro";
import { useSettingsContext } from "context/settings.context";
const Navbar = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { signOut } = useUserContext();
  const location = useLocation();

  const {
    userMenuState: [_openUserMenu, setOpenUserMenu],
    mobileMenuState: [openMobileMenu, setOpenMobileMenu],
  } = useLayoutContext();
  const getNavLinkColor = (link: string) => {
    if (link === location.pathname) return "#636472";
    return "#B4B5CF";
  };
  const {
    settingsModel: [settingsModel, setSettingsModel],
  } = useSettingsContext();
  return (
    <NavbarContainer
      onClick={() => setOpenUserMenu(false)}
      style={
        openMobileMenu
          ? {
              display: "flex",
            }
          : undefined
      }
    >
      <Nav>
        <NavLink onClick={() => navigate("/")}>
          <HomeIcon fill={getNavLinkColor("/")} />
        </NavLink>
        <NavLink onClick={() => navigate("/chat")}>
          <ChatIcon fill={getNavLinkColor("/chat")} />
        </NavLink>
        <NavLink onClick={() => navigate("friends")}>
          <FriendsIcon fill={getNavLinkColor("/friends")} />
        </NavLink>
        <NavLink onClick={() => navigate("leader-board")}>
          <LeaderboardIcon fill={getNavLinkColor("/leader-board")} />
        </NavLink>
        <NavLink onClick={() => navigate("tournament")}>
          <TournamentIcon fill={getNavLinkColor("/tournament")} />
        </NavLink>
        {openMobileMenu && (
          <>
            <Seperator />
            <NavLink onClick={() => navigate("profile/id")}>
              <EyeIcon fill={getNavLinkColor("/leader-board")} />
            </NavLink>
            <NavLink onClick={() => setSettingsModel(true)}>
              <SettingsIcon fill={getNavLinkColor("/settings")} />
            </NavLink>
          </>
        )}
      </Nav>
      <ExitIcon
        onClick={async () => {
          signOut();
          window.location.replace("/login");
          await logout();
        }}
      >
        <LogoutIcon fill={getNavLinkColor("*")} />
      </ExitIcon>
    </NavbarContainer>
  );
};
export default Navbar;
