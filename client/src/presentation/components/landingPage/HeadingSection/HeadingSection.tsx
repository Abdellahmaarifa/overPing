import Button from "components/common/Button/Button";
import {
  HeadingSectionContainer,
  HeadingSpan,
  HeadingSpanSub,
  Paragraph,
  Heading,
} from "./HeadingSection.style";
import { useNavigate } from "react-router-dom";

const HeadingSection = () => {
  const navigate = useNavigate();
  return (
    <HeadingSectionContainer>
      <Heading>
        <HeadingSpan>Serve up the Excitement</HeadingSpan>
        <HeadingSpanSub>Play it to gether</HeadingSpanSub>
      </Heading>
      <Paragraph>
        Calling all ping pong enthusiasts! Connect virtually, play together, and
        smash your way to endless fun. Join now for exciting online matches!
      </Paragraph>
      <Button
        $link="/login"
        $text="Play now"
        $size="md"
        $border={false}
        $transparent={false}
        $theme="white"
        onClick={() => navigate("/game")}
      ></Button>
    </HeadingSectionContainer>
  );
};

export default HeadingSection;
