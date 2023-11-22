import tw, { TwStyle } from "twin.macro";
import { MouseEventHandler } from "react";
import {
  FeatureContainer,
  FeatureTitle,
  FeatureImageConatiner,
  FeatureImage,
} from "./Feature.style";

const Feature = ({
  bgGradient,
  title,
  FeatureIcon,
  onClick,
}: {
  title: string;
  bgGradient: TwStyle;
  FeatureIcon: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  return (
    <FeatureContainer css={bgGradient} onClick={onClick}>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureImageConatiner>
        <FeatureImage src={FeatureIcon} alt="" />
      </FeatureImageConatiner>
    </FeatureContainer>
  );
};

export default Feature;
