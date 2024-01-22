import { useSettingsContext } from "context/settings.context";
import {
  CloseModelIcon,
  SettingMenuContainer,
  SettingMenuHeader,
  SettingModelLink,
  SettingModelLinkDanger,
} from "../Settings/Settings.style";
import CloseIcon from "assets/common/settings.svg?react";
import { MouseEvent } from "react";
const SettingsModel = () => {
  const {
    SETTINGS_LINKS,
    resetSettings,
    settingsModel: [settingsModel, setSettingsModel],
    settingsNav: [settingsNav, setSettingsNav],
  } = useSettingsContext();

  const navigate = (e: MouseEvent, paht: string) => {
    e.stopPropagation();
    setSettingsNav(paht);
  };
  return (
    <SettingMenuContainer onClick={(e) => e.stopPropagation()}>
      <CloseModelIcon>
        <CloseIcon onClick={() => setSettingsModel(false)} />
      </CloseModelIcon>
      <SettingMenuHeader>Settings</SettingMenuHeader>
      <SettingModelLink
        onClick={(e) => navigate(e, SETTINGS_LINKS.USER_INFORMATION)}
      >
        information
      </SettingModelLink>
      <SettingModelLink
        onClick={(e) => navigate(e, SETTINGS_LINKS.SECURITY_PASSWORD)}
      >
        security
      </SettingModelLink>
      {/*
        <SettingModelLink onClick={(e) => navigate(e, SETTINGS_LINKS.GAME_LOOK)}>
        Game look
      </SettingModelLink>
      */}
      {/* <SettingModelLinkDanger
        onClick={(e) => navigate(e, SETTINGS_LINKS.DELETE_ACCOUNT)}
      >
        Delete Account
      </SettingModelLinkDanger> */}
    </SettingMenuContainer>
  );
};

export default SettingsModel;
