import BackIcon from "assets/common/back-icon.svg?react";
import { useSettingsContext } from "context/settings.context";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  SettingBackIcon,
  SettingModelContainer,
  SettingModelHeader,
  SettingModelText,
} from "../Settings/Settings.style";
import {
  QRCode,
  QRCodeImg,
  QRCodeText,
  SetTwoFactorField,
} from "./SetTwoFactorAuthModel.style";

const SetTwoFactorAuthModel = () => {
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
      <SettingModelText>
        You will need a Google Authenticator to complete this process
      </SettingModelText>
      <SettingModelText>Scan the QR Code into your App</SettingModelText>
      <SetTwoFactorField>
        <QRCode>
          <QRCodeText>Generated QR Code</QRCodeText>
          <QRCodeImg />
        </QRCode>
      </SetTwoFactorField>
      <SettingModelText>
        Enter the one-time code provided by the application and click Submit to
        finish the setup
      </SettingModelText>
      <SetTwoFactorField>
        <Input $border={true} $size="md" placeholder="one-time code" />
      </SetTwoFactorField>
      <SetTwoFactorField>
        <Button $text="submit" $disabled={true} $size="auto" />
      </SetTwoFactorField>
    </SettingModelContainer>
  );
};

export default SetTwoFactorAuthModel;
