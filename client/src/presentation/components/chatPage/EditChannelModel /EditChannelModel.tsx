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
import { useUserContext } from "context/user.context";
import { useParams } from "react-router-dom";
import { useUpdateChannelMutation } from "gql/index";

const EditChannelModel = () => {
  const {
    showChannelModel: [showChannelModel, setShowChannelModel],

    showEditChannelModel: [showEditChannelModel, setShowEditChannelModel],
    currentChannel: [currentChannel, setCurrentChannel],
  } = useChatContext();
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editPass, setEditPass] = useState(false);

  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [oldPass, setOldPass] = useState<string | undefined>(undefined);
  const [pass, setPass] = useState<string | undefined>(undefined);
  // const [updateProtectedChannel] = useUpdateProtectedChannelMutation();
  // const [updatePublicPrivateChannel] = useUpdatePublicPrivateChannelMutation();
  const [updateChannelMutation] = useUpdateChannelMutation();
  const { user } = useUserContext();
  const { id } = useParams();
  /*
    userId: Float!
    channelId: Float!
    channelName: String
    description: String
    visibility: String!
    oldPassword: String
    newPassword: String!
  */

  const updatePublic = async (data: any) => {
    const res = await updateChannelMutation({
      variables: {
        data: data,
      },
    });
    console.log("uddate ... ", res);
    return res;
  };
  const updateChannel = async () => {
    try {
      // public &&  private : public private
      // public &&  private => protected : protected
      // protected : protected
      // protected => public &&  private : public &&  private
      const tes = await updatePublic({
        userId: Number(user?.id),
        channelId: Number(id),
        channelName: name,
        description: description,
        visibility: pass ? "protected" : currentChannel?.visibility,
        oldPassword: oldPass,
        newPassword: pass,
      });
      console.log("updated ** ", tes);
      if (
        currentChannel?.visibility == "public" ||
        currentChannel?.visibility == "private"
      ) {
      }
    } catch (err) {
      console.log("this is err: ", err);
    }
  };

  return (
    <ChannelModelConatiner
      onClick={() => {
        console.log("hello");
        setShowEditChannelModel(false);
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setDescription(e.target.value)}
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
            {currentChannel?.visibility == "protected" && (
              <CreateChannelModelField>
                <CreateChannelModelSubHeader>
                  Old Password
                </CreateChannelModelSubHeader>
                <Input
                  type="password"
                  $border={true}
                  $size="auto"
                  $bgColor="dark"
                  onChange={(e) => setOldPass(e.target.value)}
                />
              </CreateChannelModelField>
            )}
            <CreateChannelModelField>
              <CreateChannelModelSubHeader>
                Password
              </CreateChannelModelSubHeader>
              <Input
                type="password"
                $border={true}
                $size="auto"
                $bgColor="dark"
                onChange={(e) => setPass(e.target.value)}
              />
            </CreateChannelModelField>
          </>
        )}
        <CreateChannelModelAction>
          <Button $text="Done" $size="auto" onClick={(e) => updateChannel()} />
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
