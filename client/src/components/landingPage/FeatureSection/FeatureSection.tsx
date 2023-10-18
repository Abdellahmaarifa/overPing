import {
  Container,
  Feature,
  FeatureContainer,
  FeatureDesc,
  FeatureHeading,
  FeatureIcon,
  Heading,
} from "./FeatureSection.style";
import Feature_1 from "assets/landingPage/feature-1.svg?react";
import Feature_2 from "assets/landingPage/feature-2.svg?react";
import Feature_3 from "assets/landingPage/feature-3.svg?react";
import tw from "twin.macro";
const Col = tw.div`w-[845px] h-[845px] bg-ellipsRadialGradient rounded-[50%] absolute -right-[500px] top-[300px]`;
const FeautueSection = () => {
  return (
    <Container>
      <Col />
      <Heading>Play Games. Make friend</Heading>
      <FeatureContainer>
        <Feature>
          <FeatureIcon>
            <Feature_1 />
          </FeatureIcon>
          <FeatureHeading>Play online</FeatureHeading>
          <FeatureDesc>
            Take on players worldwide in thrilling ping pong matches.
          </FeatureDesc>
        </Feature>
        <Feature>
          <FeatureIcon>
            <Feature_2 />
          </FeatureIcon>
          <FeatureHeading>Play online</FeatureHeading>
          <FeatureDesc>
            Take on players worldwide in thrilling ping pong matches.
          </FeatureDesc>
        </Feature>
        <Feature>
          <FeatureIcon>
            <Feature_3 />
          </FeatureIcon>
          <FeatureHeading>Play online</FeatureHeading>
          <FeatureDesc>
            Take on players worldwide in thrilling ping pong matches.
          </FeatureDesc>
        </Feature>
      </FeatureContainer>
    </Container>
  );
};

export default FeautueSection;
