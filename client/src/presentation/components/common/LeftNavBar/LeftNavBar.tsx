import HomeIcon from "assets/common/home.svg?react";

import ChatIcon from "assets/common/chat.svg?react";
import EyeIcon from "assets/common/eye.svg?react";
import FriendsIcon from "assets/common/friends.svg?react";
import LeaderboardIcon from "assets/common/leaderboard.svg?react";
import LogoutIcon from "assets/common/logoutmenu.svg?react";
import SettingsIcon from "assets/common/settings.svg?react";
import TournamentIcon from "assets/common/tournament.svg?react";

import { useChatContext } from "context/chat.context";
import { useLayoutContext } from "context/layout.context";
import { useSettingsContext } from "context/settings.context";
import { useUserContext } from "context/user.context";
import { useLogoutMutation } from "gql";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ExitIcon,
  Nav,
  NavLink,
  NavbarContainer,
  Seperator,
} from "./LeftNavBar.style";
const Navbar = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const { signOut, user } = useUserContext();
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

  const {
    showChannelMenu: [showChannelMenu, setShowChannelMenu],
  } = useChatContext();
  useEffect(() => {
    setOpenMobileMenu(false);
  }, [location.pathname]);
  return (
    <NavbarContainer
      onClick={() => {
        setOpenUserMenu(false);
        setShowChannelMenu(false);
      }}
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
          // window.location.replace("/login");
          navigate("/login");
          await logout({
            variables: {
              id: Number(user.id),
            },
          });
        }}
      >
        <LogoutIcon fill={getNavLinkColor("*")} />
      </ExitIcon>
    </NavbarContainer>
  );
};
export default Navbar;
