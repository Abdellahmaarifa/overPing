import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  CloseModelIcon,
  DeleteModelButtonsContainer,
  DeleteModelConatiner,
  DeleteModelHeader,
  DeleteModeltext,
  SettingConatiner,
  SettingModelContainer,
  SettingModelHeader,
  SettingModelLink,
  SettingModelLinkDanger,
} from "./Settings.style";
import CloseIcon from "assets/common/settings.svg?react";

// the default model
const SettingModel = () => {
  return (
    <SettingModelContainer>
      <CloseModelIcon>
        <CloseIcon />
      </CloseModelIcon>
      <SettingModelHeader>Settings</SettingModelHeader>
      <SettingModelLink>information</SettingModelLink>
      <SettingModelLink>security</SettingModelLink>
      <SettingModelLink>Game look</SettingModelLink>
      <SettingModelLinkDanger>Delete Account</SettingModelLinkDanger>
    </SettingModelContainer>
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

const Setting = () => {
  return (
    <SettingConatiner>
      <DeleteModel />
    </SettingConatiner>
  );
};

export default Setting;
