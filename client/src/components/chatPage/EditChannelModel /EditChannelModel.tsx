import Input from "components/common/Input/Input";
import Switcher from "components/common/Switcher/Switcher";
import { useChatContext } from "context/chat.context";
import { MouseEvent, useState } from "react";
import {
  ChannelModelConatiner,
  CreateChannelModel,
  CreateChannelModelAction,
  CreateChannelModelField,
  CreateChannelModelHeader,
  CreateChannelModelPassHeader,
  CreateChannelModelSubHeader,
  EditLinkAction,
  EditLinkGroup,
  EditLinkName,
} from "./EditChannelModel.style";
import Button from "components/common/Button/Button";

const EditChannelModel = () => {
  const {
    showChannelModel: [showChannelModel, setShowChannelModel],
  } = useChatContext();

  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editPass, setEditPass] = useState(false);
  return (
    <ChannelModelConatiner
      onClick={() => {
        setShowChannelModel(false);
      }}
    >
      <CreateChannelModel
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <CreateChannelModelHeader>Edit Channel</CreateChannelModelHeader>

        {!editName && (
          <EditLinkGroup
            onClick={() => {
              setEditName(true);
            }}
          >
            <EditLinkName>Channel name</EditLinkName>
            <EditLinkAction>Edit</EditLinkAction>
          </EditLinkGroup>
        )}
        {editName && (
          <CreateChannelModelField>
            <CreateChannelModelSubHeader>
              channel name*
            </CreateChannelModelSubHeader>
            <Input
              $border={true}
              placeholder="# new-channel"
              $size="auto"
              $bgColor="dark"
            />
          </CreateChannelModelField>
        )}

        {!editDescription && (
          <EditLinkGroup
            onClick={() => {
              setEditDescription(true);
            }}
          >
            <EditLinkName>Channel description</EditLinkName>
            <EditLinkAction>Edit</EditLinkAction>
          </EditLinkGroup>
        )}
        {editDescription && (
          <CreateChannelModelField>
            <CreateChannelModelSubHeader>
              Description (optional)
            </CreateChannelModelSubHeader>
            <Input
              $border={true}
              placeholder="Channel description..."
              $size="auto"
              $bgColor="dark"
              $type="text-area"
            />
          </CreateChannelModelField>
        )}

        {!editPass && (
          <EditLinkGroup
            onClick={() => {
              setEditPass(true);
            }}
          >
            <EditLinkName>password</EditLinkName>
            <EditLinkAction>Edit</EditLinkAction>
          </EditLinkGroup>
        )}
        {editPass && (
          <>
            <CreateChannelModelField>
              <CreateChannelModelSubHeader>
                Password
              </CreateChannelModelSubHeader>
              <Input
                type="password"
                $border={true}
                $size="auto"
                $bgColor="dark"
              />
            </CreateChannelModelField>
            <CreateChannelModelField>
              <CreateChannelModelSubHeader>
                Password
              </CreateChannelModelSubHeader>
              <Input
                type="password"
                $border={true}
                $size="auto"
                $bgColor="dark"
              />
            </CreateChannelModelField>
          </>
        )}
        <CreateChannelModelAction>
          <Button $text="Done" $size="auto" />
          <Button
            $text="Cancel"
            $size="auto"
            $transparent={true}
            $border={true}
          />
        </CreateChannelModelAction>
      </CreateChannelModel>
    </ChannelModelConatiner>
  );
};
export default EditChannelModel;
