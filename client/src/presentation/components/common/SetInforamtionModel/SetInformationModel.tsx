import { useSettingsContext } from "context/settings.context";
import Button from "../Button/Button";
import Hexagon from "../Hexagon/Hexagon";
import Input from "../Input/Input";
import {
  SettingBackIcon,
  SettingModelContainer,
  SettingModelHeader,
} from "../Settings/Settings.style";

import BackIcon from "assets/common/back-icon.svg?react";
import BannerIcon from "assets/common/banner-icon.svg?react";
import ProfileIcon from "assets/common/profile-icon.svg?react";
import ProfileImg from "assets/common/profile.png";
import {
  ChangeBannerCaption,
  ChangeBannerConatiner,
  ChangeBannerIcon,
  ChangeBannerInput,
  ChangeBannerText,
  ChangeInfoField,
  ChangeInfoFieldHeading,
  ChangePhotosContainer,
  ChangeProfile,
  ChangeProfileIcon,
  ChangeProfileInput,
} from "./SetInformationModel.style";
const SetInformationModel = () => {
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
      <SettingModelHeader>profile information</SettingModelHeader>
      <ChangePhotosContainer>
        <ChangeBannerConatiner>
          <ChangeBannerInput type="file" />
          <ChangeBannerCaption>
            <ChangeBannerText>change your banner</ChangeBannerText>
            <ChangeBannerIcon>
              <BannerIcon />
            </ChangeBannerIcon>
          </ChangeBannerCaption>
          <ChangeProfile>
            <Hexagon
              width={89}
              height={100}
              outline={true}
              Image={ProfileImg}
              stroke="#4B4947"
              percentage={1}
            />
            <ChangeProfileInput type="file" />
            <ChangeProfileIcon>
              <ProfileIcon />
            </ChangeProfileIcon>
          </ChangeProfile>
        </ChangeBannerConatiner>
      </ChangePhotosContainer>

      <ChangeInfoField>
        <ChangeInfoFieldHeading>change your username</ChangeInfoFieldHeading>
        <Input $border={true} placeholder="user Name" $size="auto" />
      </ChangeInfoField>
      <ChangeInfoField>
        <ChangeInfoFieldHeading>
          change your mail address
        </ChangeInfoFieldHeading>
        <Input $border={true} placeholder="mail@gmail.com" $size="auto" />
      </ChangeInfoField>
      <ChangeInfoField>
        <Button $text="submit change" $size="auto" $disabled={true} />
      </ChangeInfoField>
    </SettingModelContainer>
  );
};

export default SetInformationModel;
