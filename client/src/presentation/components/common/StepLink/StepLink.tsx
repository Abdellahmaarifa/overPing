import { MouseEventHandler } from "react";
import tw from "twin.macro";
import { BackLinkContainer, BackIcon, BackLink } from "./StepLink.style";
import { useLoginContext } from "context/login.context";
const StepLink = (props: {
  children?: JSX.Element;
  text?: string;
  lastStep: number;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  const { setRegisterStep, registerStep } = useLoginContext();
  return (
    <BackLinkContainer onClick={props.onClick}>
      <BackIcon>{props.children}</BackIcon>

      <BackLink>{`Stpe ${registerStep + 1} of ${props.lastStep + 1}`}</BackLink>
    </BackLinkContainer>
  );
};

export default StepLink;
