import React from "react";
import tw from "twin.macro";
import FeatureIcon from "../../../assets/home/dice.svg";
import Button from "components/common/Button/Button";
import Feature from "../Feature/Feature";
import {
  FeatureGroup,
  FeatureSecondary,
  FeatureContainer,
  FeatureBoxInner,
  FeatureBox,
  FeatureIconImage,
  FeatureTitle,
} from "./Features.style";

const Features = () => {
  const greenGradient = tw`bg-green-gradient`;
  const redBlueGradient = tw`bg-red-to-blue-gradient`;
  const yellowPinkGradient = tw`bg-yellow-to-pink`;

  return (
    <FeatureContainer>
      <FeatureGroup>
        <FeatureBox>
          <FeatureBoxInner>
            <FeatureTitle>Random Online Match</FeatureTitle>
            <Button $size="md" $text="Play" />
          </FeatureBoxInner>
          <FeatureIconImage src={FeatureIcon} alt="" />
        </FeatureBox>
        <FeatureSecondary>
          <Feature
            bgGradient={greenGradient}
            title="Computer"
            FeatureIcon={FeatureIcon}
          />
          <Feature
            bgGradient={redBlueGradient}
            title="Computer"
            FeatureIcon={FeatureIcon}
          />
          <Feature
            bgGradient={yellowPinkGradient}
            title="Computer"
            FeatureIcon={FeatureIcon}
          />
        </FeatureSecondary>
      </FeatureGroup>
    </FeatureContainer>
  );
};

export default Features;
