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
} from "./ChannelModel.style";
import Button from "components/common/Button/Button";
import { useUserContext } from "context/user.context";
import { useCreateChannelMutation } from "gql/index";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import Validate from "domain/validation";
import { useNavigate } from "react-router-dom";

interface CreateChannelData {
  channelName: string;
  description?: string;
  password?: string;
  userId: number;
  visibility: string;
}

const ChannelModel = () => {
  const {
    showChannelModel: [showChannelModel, setShowChannelModel],
    channels: [channels, setChannels],
  } = useChatContext();
  const navigate = useNavigate();
  const [name, setName] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [pass, setPass] = useState<string | undefined>(undefined);
  const [confirmPass, setConfirmPass] = useState<string | undefined>(undefined);
  const [visibility, setVisibility] = useState<boolean>(false);
  const { user } = useUserContext();
  // const [createPublicPrivateChannel] = useCreatePublicPrivateChannelMutation();
  // const [createProtectedChannel] = useCreateProtectedChannelMutation();

  const [createChannelMutation] = useCreateChannelMutation();
  const createChannel = async () => {
    console.log(
      "this is data to craete channel: ",
      name,
      description,
      pass,
      confirmPass,
      visibility
    );
    // some verification on the data should be here

    // something like this:
    const dataSchema = Yup.object({
      channelName: Yup.string().required(),
      description: Yup.string(),
      password: Yup.string(),
      userId: Yup.number().required(),
      visibility: Yup.string().required(),
    });

    try {
      if ((pass && pass !== confirmPass) || (confirmPass && !pass))
        throw { message: "passowrd are not the same!" };
      const data: CreateChannelData = await dataSchema.validate({
        channelName: name,
        description: description,
        userId: Number(user?.id),
        password: pass,
        visibility: visibility ? "private" : pass ? "protected" : "public",
      });
      // create a protected channel
      try {
        await toast.promise(
          createChannelMutation({
            variables: {
              data: data as any,
            },
          }),
          {
            loading: "please wait ..",
            success: (data: any) => {
              console.log(data);
              const channel = data.data.createChannel;
              if (channel) setShowChannelModel(false);
              // update the current state
              const newChannel = {
                id: channel?.id,
                name: channel?.name,
                visibility: channel?.visibility,
              };
              console.log("****** new channel: ", newChannel);
              navigate(`/chat/channel/${newChannel.id}`);
              return "channel created succesfully";
            },
            error: (err) => {
              console.log(err);
              setShowChannelModel(false);
              return err?.message ? err?.message : "something went wrong";
            },
          }
        );
      } catch (err) {
        console.log("err from  creating channel : ", err);
      }
    } catch (err: any) {
      toast.error(err?.message ? err.message : "something went wrong");
    }
  };

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
        <CreateChannelModelHeader>Create Channel</CreateChannelModelHeader>
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
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </CreateChannelModelField>
        <CreateChannelModelField>
          <Switcher
            title="Private channel"
            description="Only selected members and roles will be able to view this channel."
            enable={visibility}
            onChange={() => {
              setVisibility(!visibility);
            }}
          />
        </CreateChannelModelField>
        <CreateChannelModelField>
          <CreateChannelModelPassHeader>
            Password (optional)
          </CreateChannelModelPassHeader>
          <Input
            type="password"
            $border={true}
            $size="auto"
            $bgColor="dark"
            onChange={(e) => setPass(e.target.value)}
          />
        </CreateChannelModelField>
        <CreateChannelModelField>
          <CreateChannelModelPassHeader>
            Confirm Password (optional)
          </CreateChannelModelPassHeader>
          <Input
            type="password"
            $border={true}
            $size="auto"
            $bgColor="dark"
            onChange={(e) => setConfirmPass(e.target.value)}
          />
        </CreateChannelModelField>
        <CreateChannelModelAction>
          <Button
            $text="Create Channel"
            $size="auto"
            onClick={(_) => createChannel()}
          />
          <Button
            $text="Cancel"
            $size="auto"
            $transparent={true}
            $border={true}
            onClick={() => setShowChannelModel(false)}
          />
        </CreateChannelModelAction>
      </CreateChannelModel>
      <Toaster position="top-center" />
    </ChannelModelConatiner>
  );
};
export default ChannelModel;
