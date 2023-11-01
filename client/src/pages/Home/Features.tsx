import React from "react";
import tw from "twin.macro";
import FeatureIcon from "../../assets/home/dice.svg";
import Button from "components/common/Button/Button";

const FeatureContainer = tw.div`
  w-full flex flex-col justify-center items-center gap-[32px] xs:gap-[16px] lg:gap-[10px] lg:flex-row max-w-[740px] p-[5vw] sm:p-0
`;

const FeatureBox = tw.div`
  bg-[#3874A9] w-full h-[137px] rounded-[14px] lg:max-w-[366px] flex relative min-w-[210px]
`;

const FeatureBoxInner = tw.div`
  w-full h-full p-[15px] flex justify-evenly items-start flex-col z-[1]
`;

const FeatureTitle = tw.h2`
  font-rubik text-[16px] text-[#DDDDE9] flex sm:text-[22px] md:text-[20px]
`;

const FeatureButton = tw.button`
  text-white bg-[#3874A9] p-[8px] px-[16px] rounded-[14px] font-inter text-[14px] hover:bg-[#2E619D] transition duration-300
`;

const FeatureIconImage = tw.img`
  w-[100px] absolute bottom-0 right-0 xs:relative xs:self-end xs:w-[200px]
`;

const FeatureComponent = ({ bgGradient, title }) => {
  return (
    <div
      css={bgGradient}
      tw="w-full h-full xs:max-h-[26vw] md:w-[26vw] xs:h-full rounded-[14px] relative p-[15px] flex justify-between items-center xs:flex-col"
    >
      <FeatureTitle tw="md:text-[16px]">{title}</FeatureTitle>
      <div tw="w-[70px] xs:w-[70px]">
        <img src={FeatureIcon} alt="" tw="h-auto w-full" />
      </div>
    </div>
  );
};

const Features = () => {
  const greenGradient = tw`bg-green-gradient`;
  const redBlueGradient = tw`bg-red-to-blue-gradient`;
  const yellowPinkGradient = tw`bg-yellow-to-pink`;

  return (
    <FeatureContainer>
      <div tw="w-full flex flex-col justify-center items-center gap-[32px] xs:gap-[16px] lg:gap-[10px] lg:flex-row max-w-[740px] p-[5vw] sm:p-0">
        <FeatureBox>
          <FeatureBoxInner>
            <FeatureTitle>Random Online Match</FeatureTitle>
            <Button $size="md" $text="Play" />
          </FeatureBoxInner>
          <FeatureIconImage src={FeatureIcon} alt="" />
        </FeatureBox>
        <div tw="w-full  flex justify-between items-center lg:max-w-[366px] h-auto xs:h-[137px] gap-[10px] flex-col xs:flex-row self-center min-w-[fit-content] sm:min-w-[auto]">
          <FeatureComponent bgGradient={greenGradient} title="Computer" />
          <FeatureComponent bgGradient={redBlueGradient} title="Computer" />
          <FeatureComponent bgGradient={yellowPinkGradient} title="Computer" />
        </div>
      </div>
    </FeatureContainer>
  );
};

export default Features;
