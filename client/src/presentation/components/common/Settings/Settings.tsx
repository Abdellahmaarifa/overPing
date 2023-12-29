import BackIcon from "assets/common/back-icon.svg?react";
import tw from "twin.macro";

import { SettingConatiner } from "./Settings.style";

import { useSettingsContext } from "context/settings.context";
import { MouseEvent } from "react";
import { useLayoutContext } from "context/layout.context";
import SettingsModel from "../SettingsModel/SettingsModel";
import DeleteModel from "../DeleteModel/DeleteModel";
import SetInformationModel from "../SetInforamtionModel/SetInformationModel";
import SetGameModel from "../SetGameModel/SetGameModel";
import SetPasswordModel from "../SetPasswordModel/SetPasswordModel";
import SetTwoFactorAuthModel from "../SetTwoFactorAuthModel/SetTwoFactorAuthModel";
// the default model

const Settings = () => {
  const {
    SETTINGS_LINKS,
    resetSettings,
    settingsModel: [settingsModel, _],
    settingsNav: [settingsNav, setSettingsNav],
  } = useSettingsContext();
  const {
    mobileMenuState: [openMobileMenu, setOpenMobileMenu],
  } = useLayoutContext();
  return settingsModel ? (
    <SettingConatiner onClick={() => !openMobileMenu && resetSettings()}>
      {settingsNav === SETTINGS_LINKS.HOME && <SettingsModel />}
      {settingsNav === SETTINGS_LINKS.USER_INFORMATION && (
        <SetInformationModel />
      )}
      {/*
        settingsNav === SETTINGS_LINKS.GAME_LOOK && <SetGameModel />
        */}
      {settingsNav === SETTINGS_LINKS.SECURITY_PASSWORD && <SetPasswordModel />}
      {settingsNav == SETTINGS_LINKS.SECURITY_TWO_FACTOR_AUTH && (
        <SetTwoFactorAuthModel />
      )}
      {settingsNav === SETTINGS_LINKS.DELETE_ACCOUNT && <DeleteModel />}
    </SettingConatiner>
  ) : null;
};

export default Settings;
