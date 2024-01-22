import { useSettingsContext } from "context/settings.context";
import { useUserContext } from "context/user.context";
import { useDeleteAccountMutation } from "gql/index";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  DeleteModelButtonsContainer,
  DeleteModelConatiner,
  DeleteModelHeader,
  DeleteModeltext,
} from "./DeleteModel.style";
import { useNavigate } from "react-router-dom";

const DeleteModel = () => {
  const {
    SETTINGS_LINKS,
    resetSettings,
    settingsModel: [settingsModel, setSettingsModel],
    settingsNav: [settingsNav, setSettingsNav],
  } = useSettingsContext();

  const [pass, setPass] = useState("");
  const { user } = useUserContext();
  const [deleteAccount] = useDeleteAccountMutation();
  const navigate = useNavigate();
  const DeleteUserAccount = async () => {
    try {
      await toast.promise(
        deleteAccount({
          variables: {
            id: Number(user?.id),
            password: pass,
          },
        }),
        {
          loading: "please wait ..",
          success: (data) => {
            console.log(data);
            return "we are sorry to see you left.";
          },
          error: (err) => {
            console.log(err);
            return "something went wrong!";
          },
        }
      );
    } catch (err) {
      console.log("err from deleting account: ", err);
    }
  };
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
        onChange={(e) => setPass(e.target.value)}
      />
      <DeleteModelButtonsContainer>
        <Button
          $text="Cancel"
          $transparent={true}
          $border={true}
          $size="md"
          onClick={() => setSettingsNav(SETTINGS_LINKS.HOME)}
        />
        <Button
          $text="Delete Account"
          $disabled={pass ? false : true}
          $size="md"
          onClick={() => {
            if (!pass) return;
            DeleteUserAccount();
          }}
        />
      </DeleteModelButtonsContainer>

      <Toaster position="top-center" />
    </DeleteModelConatiner>
  );
};

export default DeleteModel;
