import { useSettingsContext } from "context/settings.context";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  DeleteModelButtonsContainer,
  DeleteModelConatiner,
  DeleteModelHeader,
  DeleteModeltext,
} from "./DeleteModel.style";

const DeleteModel = () => {
  const {
    SETTINGS_LINKS,
    resetSettings,
    settingsModel: [settingsModel, setSettingsModel],
    settingsNav: [settingsNav, setSettingsNav],
  } = useSettingsContext();
  return (
    <DeleteModelConatiner onClick={(e) => e.stopPropagation()}>
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
        <Button
          $text="Cancel"
          $transparent={true}
          $border={true}
          $size="md"
          onClick={() => setSettingsNav(SETTINGS_LINKS.HOME)}
        />
        <Button $text="Delete Account" $disabled={true} $size="md" />
      </DeleteModelButtonsContainer>
    </DeleteModelConatiner>
  );
};

export default DeleteModel;
