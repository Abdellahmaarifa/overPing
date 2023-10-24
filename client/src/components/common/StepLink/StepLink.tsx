import tw from "twin.macro";
import { BackLinkContainer, BackIcon, BackLink } from "./StepLink.style";
const StepLink = (props: { children?: JSX.Element; text?: string }) => {
  return (
    <BackLinkContainer>
      <BackIcon>{props.children}</BackIcon>
      <BackLink>{props.text}</BackLink>
    </BackLinkContainer>
  );
};

export default StepLink;
