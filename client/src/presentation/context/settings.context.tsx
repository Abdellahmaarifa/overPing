import { createContext, useContext, useState } from "react";

export const SETTINGS_LINKS = {
  HOME: "home",
  USER_INFORMATION: "userInformation",
  GAME_LOOK: "gameLook",
  SECURITY_PASSWORD: "securityPassword",
  SECURITY_TWO_FACTOR_AUTH: "securityTwoFactorAuth",
  DELETE_ACCOUNT: "deleteAccount",
};

type SETTINGS_LINKS_TYPE = {
  HOME: string;
  USER_INFORMATION: string;
  GAME_LOOK: string;
  SECURITY_PASSWORD: string;
  SECURITY_TWO_FACTOR_AUTH: string;
  DELETE_ACCOUNT: string;
};

type Props = {
  children: React.ReactNode;
  value?: SettingsCtxType;
};

type SettingNavType =
  | SETTINGS_LINKS_TYPE["HOME"]
  | SETTINGS_LINKS_TYPE["USER_INFORMATION"]
  | SETTINGS_LINKS_TYPE["GAME_LOOK"]
  | SETTINGS_LINKS_TYPE["SECURITY_TWO_FACTOR_AUTH"]
  | SETTINGS_LINKS_TYPE["SECURITY_PASSWORD"]
  | SETTINGS_LINKS_TYPE["DELETE_ACCOUNT"];
type UseStateType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

type SettingsCtxType = {
  settingsModel: UseStateType<Boolean>;
  settingsNav: UseStateType<String>;
  resetSettings: () => void;
  SETTINGS_LINKS: SETTINGS_LINKS_TYPE;
};

export class SettingContextValue implements SettingsCtxType {
  settingsModel: UseStateType<Boolean>;
  settingsNav: UseStateType<String>;
  SETTINGS_LINKS: SETTINGS_LINKS_TYPE;
  constructor() {
    this.settingsModel = useState<Boolean>(false);
    this.settingsNav = useState<String>("home");
    this.SETTINGS_LINKS = SETTINGS_LINKS;
  }
  resetSettings = () => {
    this.settingsNav[1](this.SETTINGS_LINKS.HOME);
    this.settingsModel[1](false);
  };
}

const SettingsContext = createContext<SettingsCtxType>({
  settingsModel: [false, () => {}],
  settingsNav: ["home", () => {}],
  resetSettings: () => {},
  SETTINGS_LINKS,
});

const useSettingsContextProvider =
  () =>
  ({ children }: Props): JSX.Element => {
    return (
      <SettingsContext.Provider value={new SettingContextValue()}>
        {children}
      </SettingsContext.Provider>
    );
  };

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettingsContext was used outside of its provider.");
  }
  return context;
};

export default useSettingsContextProvider;
