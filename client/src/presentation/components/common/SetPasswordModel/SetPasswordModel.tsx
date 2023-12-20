import { useSettingsContext } from "context/settings.context";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  SettingBackIcon,
  SettingModelContainer,
  SettingModelHeader,
} from "../Settings/Settings.style";
import Switcher from "../Switcher/Switcher";

import BackIcon from "assets/common/back-icon.svg?react";
import { SetPassField, SetPassFieldHeading } from "./SetPasswordModel.style";
const SetPasswordModel = () => {
  const {
    SETTINGS_LINKS,
    resetSettings,
    settingsModel: [settingsModel, _],
    settingsNav: [settingsNav, setSettingsNav],
  } = useSettingsContext();
  return (
    <SettingModelContainer onClick={(e) => e.stopPropagation()}>
      <SettingBackIcon>
        <BackIcon
          onClick={() => {
            setSettingsNav(SETTINGS_LINKS.HOME);
          }}
        />
      </SettingBackIcon>
      <SettingModelHeader>Security</SettingModelHeader>
      <SetPassField>
        <SetPassFieldHeading>change your password</SetPassFieldHeading>
        <Input
          type="password"
          $size="auto"
          $border={true}
          placeholder="New Password"
        />
        <Input
          type="password"
          $size="auto"
          $border={true}
          placeholder="Repeat New Password"
        />
      </SetPassField>
      <SetPassField>
        <Input
          $size="auto"
          $border={true}
          type="password"
          placeholder="Enter your Current Password (required)"
        />
      </SetPassField>
      <SetPassField>
        <Switcher
          title="Two-Factor Authentication"
          description="You need to set up Google Authenticator on your phone to activate your account."
        />
        <SetPassField>
          <Button $text="submit" $size="auto" $disabled={true} />
        </SetPassField>
      </SetPassField>
    </SettingModelContainer>
  );
};

export default SetPasswordModel;
