import { useSettingsContext } from "context/settings.context";
import Button from "../Button/Button";
import {
  SettingBackIcon,
  SettingModelContainer,
  SettingModelHeader,
  SettingModelText,
} from "../Settings/Settings.style";
import Switcher from "../Switcher/Switcher";

import BackIcon from "assets/common/back-icon.svg?react";
import GameClassicImg from "assets/common/game-classic.png";
import GameLastPong from "assets/common/game-lastpong.png";
import GameSandStormImg from "assets/common/game-sandstorm.png";
import {
  GameStyle,
  GameStyleConatiner,
  GameStyleField,
  GameStyleImage,
  GameStyleText,
} from "./SetGameModel.style";
const SetGameModel = () => {
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
        enable={false}
        onChange={() => {}}
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

export default SetGameModel;
