import BackIcon from "assets/common/back-icon.svg?react";
import BannerIcon from "assets/common/banner-icon.svg?react";
import ProfileIcon from "assets/common/profile-icon.svg?react";
import ProfileImg from "assets/common/profile.png";
import CloseIcon from "assets/common/settings.svg?react";
import Button from "../Button/Button";
import Hexagon from "../Hexagon/Hexagon";
import Input from "../Input/Input";
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
  CloseModelIcon,
  DeleteModelButtonsContainer,
  DeleteModelConatiner,
  DeleteModelHeader,
  DeleteModeltext,
  GameStyle,
  GameStyleConatiner,
  GameStyleField,
  GameStyleImage,
  GameStyleText,
  QRCode,
  QRCodeImg,
  QRCodeText,
  QrCodeText,
  SetPassField,
  SetPassFieldHeading,
  SetTwoFactorField,
  SettingBackIcon,
  SettingConatiner,
  SettingMenuContainer,
  SettingMenuHeader,
  SettingModelContainer,
  SettingModelHeader,
  SettingModelLink,
  SettingModelLinkDanger,
  SettingModelSwitcher,
  SettingModelSwitcherConatiner,
  SettingModelSwitcherDescription,
  SettingModelSwitcherField,
  SettingModelSwitcherHeader,
  SettingModelSwitcherIcon,
  SettingModelSwitcherInput,
  SettingModelSwitcherMask,
  SettingModelText,
} from "./Settings.style";

import GameClassicImg from "assets/common/game-classic.png";
import GameLastPong from "assets/common/game-lastpong.png";
import GameSandStormImg from "assets/common/game-sandstorm.png";
import LockIcon from "assets/common/lock.svg?react";
// the default model
const SettingModel = () => {
  return (
    <SettingMenuContainer>
      <CloseModelIcon>
        <CloseIcon />
      </CloseModelIcon>
      <SettingMenuHeader>Settings</SettingMenuHeader>
      <SettingModelLink>information</SettingModelLink>
      <SettingModelLink>security</SettingModelLink>
      <SettingModelLink>Game look</SettingModelLink>
      <SettingModelLinkDanger>Delete Account</SettingModelLinkDanger>
    </SettingMenuContainer>
  );
};

// the delete account model
const DeleteModel = () => {
  return (
    <DeleteModelConatiner>
      <DeleteModelHeader>
        Are you sure you want to delete your account?
      </DeleteModelHeader>
      <DeleteModeltext>
        This will immediately log you out and you will not be able to login
        again.
      </DeleteModeltext>
      <Input
        placeholder="Password(required)"
        type="password"
        $theme="grey"
        $border={true}
        $size="auto"
      />
      <DeleteModelButtonsContainer>
        <Button $text="Cancel" $transparent={true} $border={true} $size="md" />
        <Button $text="Delete Account" $disabled={true} $size="md" />
      </DeleteModelButtonsContainer>
    </DeleteModelConatiner>
  );
};

const SetInformationModel = () => {
  return (
    <SettingModelContainer>
      <SettingBackIcon>
        <BackIcon />
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

const Switcher = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <SettingModelSwitcherField>
      <SettingModelSwitcherConatiner>
        <div>
          <SettingModelSwitcherIcon>
            <LockIcon />
          </SettingModelSwitcherIcon>
          <SettingModelSwitcherHeader>{title}</SettingModelSwitcherHeader>
        </div>
        <SettingModelSwitcher className="group">
          <SettingModelSwitcherInput type="checkbox" className="peer" />
          <SettingModelSwitcherMask></SettingModelSwitcherMask>
        </SettingModelSwitcher>
      </SettingModelSwitcherConatiner>
      <SettingModelSwitcherDescription>
        {description}
      </SettingModelSwitcherDescription>
    </SettingModelSwitcherField>
  );
};
const SetGameModel = () => {
  return (
    <SettingModelContainer>
      <SettingBackIcon>
        <BackIcon />
      </SettingBackIcon>
      <SettingModelHeader>Game look</SettingModelHeader>
      <SettingModelText>
        Select the game mode you would like to use
      </SettingModelText>
      <GameStyleConatiner>
        <GameStyle>
          <GameStyleImage src={GameClassicImg} />
          <GameStyleText>Classic Mode</GameStyleText>
        </GameStyle>
        <GameStyle>
          <GameStyleImage src={GameSandStormImg} />
          <GameStyleText>Sandstorm</GameStyleText>
        </GameStyle>
        <GameStyle>
          <GameStyleImage src={GameLastPong} />
          <GameStyleText>Last Pong</GameStyleText>
        </GameStyle>
      </GameStyleConatiner>
      <Switcher
        title="Choose your own map"
        description="select this option to upload your favorit map"
      />
      <Button
        $size="md"
        $text="Custom image"
        $transparent={true}
        $border={true}
      />
      <GameStyleField>
        <Button $size="auto" $text="submit changes" $disabled={true} />
      </GameStyleField>
    </SettingModelContainer>
  );
};

const SetPassword = () => {
  return (
    <SettingModelContainer>
      <SettingBackIcon>
        <BackIcon />
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
      <Switcher
        title="Two-Factor Authentication"
        description="You need to set up Google Authenticator on your phone to activate your account."
      />
      <SetPassField>
        <Button $text="submit" $size="auto" $disabled={true} />
      </SetPassField>
    </SettingModelContainer>
  );
};

const SetTwoFactorAuth = () => {
  return (
    <SettingModelContainer>
      <SettingBackIcon>
        <BackIcon />
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
const Setting = () => {
  return (
    <SettingConatiner>
      <SetTwoFactorAuth />
    </SettingConatiner>
  );
};

export default Setting;
