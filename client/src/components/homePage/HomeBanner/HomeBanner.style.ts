import tw from "twin.macro";

export const BannerContainer = tw.div`
  relative bg-cover bg-no-repeat bg-center w-full h-[130px] md:h-[156px] bg-welcome-banner rounded-[14px] mt-[80px]
  flex justify-between items-center max-w-[740px] min-w-[215px]
`;

export const BannerText = tw.div`
  w-[100%] xs:w-[50vw] max-w-[500px] p-[12px] gap-[10px] flex justify-center items-start flex-col min-w-[215px] sm:pr-[35px] sm:pl-[35px]
  font-rubik text-[16px] text-[#CDCDDF] font-bold sm:text-[22px] md:text-[28px]
`;

export const BannerTitle = tw.h1`
  font-rubik text-[16px] text-[#CDCDDF] font-bold sm:text-[22px] md:text-[28px]
`;

export const BannerSubtitle = tw.p`
  text-[13px] md:text-[18px] sm:text-[14px] font-rubik font-normal text-white
`;

export const BannerImage = tw.img`
  absolute bottom-0 right-[0] h-[40vw] md:h-[480px] max-h-[200px] xs:-mr-[10vw] sm:mr-0 hidden xs:block
`;

export const Span = tw.span`
  font-rubik text-[16px] sm:text-[22px]  md:text-[28px] text-[#4E95D4] font-bold
`;
