import React from "react";
import tw from "twin.macro";
import FeatureIcon from "assets/home/dice.svg";
import ComputerIcon from "assets/home/computer.svg";
import TrophyIcon from "assets/home/trophy.svg";
import PaddelIcon from "assets/home/paddle.svg";
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
import { useNavigate } from "react-router-dom";
const Features = () => {
  const greenGradient = tw`bg-green-gradient`;
  const redBlueGradient = tw`bg-red-to-blue-gradient`;
  const yellowPinkGradient = tw`bg-yellow-to-pink`;
  const navigate = useNavigate();
  return (
    <FeatureContainer>
      <FeatureGroup>
        <FeatureBox>
          <FeatureBoxInner>
            <FeatureTitle>Random Online Match</FeatureTitle>
            <Button $size="md" $text="Play" onClick={() => navigate("game")} />
          </FeatureBoxInner>
          <FeatureIconImage src={FeatureIcon} alt="" />
        </FeatureBox>
        <FeatureSecondary>
          <Feature
            onClick={() => navigate("/game?type=computer")}
            bgGradient={greenGradient}
            title="Computer"
            FeatureIcon={ComputerIcon}
          />
          <Feature
            onClick={() => navigate("/game?type=friends")}
            bgGradient={redBlueGradient}
            title="Friends"
            FeatureIcon={PaddelIcon}
          />
          <Feature
            onClick={() => navigate("/tournament")}
            bgGradient={yellowPinkGradient}
            title="Tournament"
            FeatureIcon={TrophyIcon}
          />
        </FeatureSecondary>
      </FeatureGroup>
    </FeatureContainer>
  );
};

export default Features;
