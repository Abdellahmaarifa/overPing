import ImgSrc from "assets/landingPage/about-img.png";
import {
  Container,
  Content,
  ContentDes,
  ContentHeading,
  Img,
} from "./AboutSection.style";
import Button from "components/common/Button/Button";
import tw from "twin.macro";

const AboutSection = () => {
  return (
    <Container>
      <Content id="whyus">
        <ContentHeading>Why Choose us?</ContentHeading>
        <ContentDes>
          Experience gaming like never before with our smooth and uninterrupted
          gameplay. Our platform ensures a lag-free and immersive experience
          that lets you fully engage in the action. We value fair competition,
          providing all players with an equal chance to succeed in our
          tournaments, proving their skill and dedication. Join us today to
          experience ping pong with unmatched fairness and excitement!
        </ContentDes>
        <Button $text="Try it" $size="md" $link="login" />
      </Content>
      <Img>
        <img src={ImgSrc} alt="ping pong table" />
      </Img>
    </Container>
  );
};

export default AboutSection;
