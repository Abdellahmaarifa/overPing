import Button from "../Button/Button";
import Input from "../Input/Input";
import {
  ConfirmModelAction,
  ConfirmModelContainer,
  ConfirmModelText,
  ConfirmModelWrapper,
} from "./ConfirmModel.style";

const ConfirmModel = ({
  header,
  resolveText,
  rejectText,
  confirm,
}: {
  header: string;
  resolveText: string;
  rejectText: string;
  confirm?: boolean;
}) => {
  return (
    <ConfirmModelWrapper>
      <ConfirmModelContainer>
        <ConfirmModelText>{header}</ConfirmModelText>
        {confirm && (
          <Input
            placeholder="Password"
            $size="auto"
            $bgColor="darker"
            $border={true}
          />
        )}
        <ConfirmModelAction>
          <Button $text={resolveText} $size="auto" />
          <Button
            $text={rejectText}
            $size="auto"
            $transparent={true}
            $border={true}
          />
        </ConfirmModelAction>
      </ConfirmModelContainer>
    </ConfirmModelWrapper>
  );
};

export default ConfirmModel;
