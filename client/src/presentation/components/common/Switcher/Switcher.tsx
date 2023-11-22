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

export default Switcher;
