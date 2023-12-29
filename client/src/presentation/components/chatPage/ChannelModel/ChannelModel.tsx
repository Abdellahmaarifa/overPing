import Input from "components/common/Input/Input";
import Switcher from "components/common/Switcher/Switcher";
import { useChatContext } from "context/chat.context";
import { MouseEvent } from "react";
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

const ChannelModel = () => {
  const {
    showChannelModel: [showChannelModel, setShowChannelModel],
  } = useChatContext();
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
          />
        </CreateChannelModelField>
        <CreateChannelModelField>
          <Switcher
            title="Private channel"
            description="Only selected members and roles will be able to view this channel."
            enable={false}
            onChange={() => {}}
          />
        </CreateChannelModelField>
        <CreateChannelModelField>
          <CreateChannelModelPassHeader>
            Password (optional)
          </CreateChannelModelPassHeader>
          <Input type="password" $border={true} $size="auto" $bgColor="dark" />
        </CreateChannelModelField>
        <CreateChannelModelField>
          <CreateChannelModelPassHeader>
            Confirm Password (optional)
          </CreateChannelModelPassHeader>
          <Input type="password" $border={true} $size="auto" $bgColor="dark" />
        </CreateChannelModelField>
        <CreateChannelModelAction>
          <Button $text="Create Channel" $size="auto" />
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
export default ChannelModel;
