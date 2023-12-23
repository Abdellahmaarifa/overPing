import LockIcon from "assets/common/lock.svg?react";
import {
  SettingModelSwitcher,
  SettingModelSwitcherConatiner,
  SettingModelSwitcherDescription,
  SettingModelSwitcherField,
  SettingModelSwitcherHeader,
  SettingModelSwitcherIcon,
  SettingModelSwitcherInput,
  SettingModelSwitcherMask,
} from "./Switcher.style";
const Switcher = ({
  title,
  description,
  enable,
  onChange
}: {
  title: string;
  description: string;
  enable: boolean;
  onChange: any
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
          <SettingModelSwitcherInput type="checkbox" className="peer" checked={enable} onChange={onChange}/>
          <SettingModelSwitcherMask></SettingModelSwitcherMask>
        </SettingModelSwitcher>
      </SettingModelSwitcherConatiner>
      <SettingModelSwitcherDescription>
        {description}
      </SettingModelSwitcherDescription>
    </SettingModelSwitcherField>
  );
};

export default Switcher;
