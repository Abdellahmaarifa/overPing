import tw from "twin.macro";

export const FeatureContainer = tw.div`

w-full h-full xs:max-h-[26vw] md:w-[26vw] xs:h-full rounded-[14px] relative p-[15px] flex justify-between items-center xs:flex-col cursor-pointer
`;
export const FeatureTitle = tw.div`

font-rubik text-[18px] text-[#DDDDE9] flex   md:text-[20px] xs:text-[16px] sm:text-[16px] lg:text-[16px]

`;

export const FeatureImageConatiner = tw.div`
w-[70px] xs:w-[70px]
`;

export const FeatureImage = tw.img`
h-auto w-full
`;
