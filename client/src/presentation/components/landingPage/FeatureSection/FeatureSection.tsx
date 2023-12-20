import Feature_1 from "assets/landingPage/feature-1.svg?react";
import Feature_2 from "assets/landingPage/feature-2.svg?react";
import Feature_3 from "assets/landingPage/feature-3.svg?react";
import tw from "twin.macro";
import {
  Container,
  Feature,
  FeatureContainer,
  FeatureDesc,
  FeatureHeading,
  FeatureIcon,
  Heading,
  Blob,
} from "./FeatureSection.style";
const FeautueSection = () => {
  return (
    <Container>
      <Blob />
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
          <FeatureHeading>Make friends</FeatureHeading>
          <FeatureDesc>
            Connect with ping pong enthusiasts and share the fun.
          </FeatureDesc>
        </Feature>
        <Feature>
          <FeatureIcon>
            <Feature_3 />
          </FeatureIcon>
          <FeatureHeading>Tournament</FeatureHeading>
          <FeatureDesc>
            Compete in high-stakes tournaments and become the champion.
          </FeatureDesc>
        </Feature>
      </FeatureContainer>
    </Container>
  );
};

export default FeautueSection;
