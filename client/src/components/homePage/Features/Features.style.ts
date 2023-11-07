import tw from "twin.macro";

export const FeatureGroup = tw.div`
w-full flex flex-col justify-center items-center gap-[32px] xs:gap-[16px] lg:gap-[10px] lg:flex-row max-w-[740px] p-[5vw] sm:p-0
`;

export const FeatureSecondary = tw.div`
w-full  flex justify-between items-center lg:max-w-[366px] h-auto xs:h-[137px] gap-[10px] flex-col xs:flex-row self-center min-w-[fit-content] sm:min-w-[auto]
`;

export const FeatureContainer = tw.div`
  w-full flex flex-col justify-center items-center gap-[32px] xs:gap-[16px] lg:gap-[10px] lg:flex-row max-w-[740px] p-[5vw] sm:p-0
`;

export const FeatureBox = tw.div`
  bg-[#3874A9] w-full h-[137px] rounded-[14px] lg:max-w-[366px] flex relative min-w-[210px]
`;

export const FeatureBoxInner = tw.div`
  w-full h-full p-[15px] flex justify-evenly items-start flex-col z-[1]
`;

export const FeatureTitle = tw.h2`
  font-rubik text-[16px] text-[#DDDDE9] flex sm:text-[22px] md:text-[20px]
`;

export const FeatureIconImage = tw.img`
  w-[100px] absolute bottom-0 right-[10px] xs:relative xs:self-end xs:w-[200px]
`;
