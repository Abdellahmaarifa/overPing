import tw from "twin.macro";

export const Container = tw.div`w-full pt-[250px] pb-[50px] md:pt-[350px] md:pb-[150px] flex justify-center items-center flex-col w-full relative min-w-[350px]  lg:m-auto`;
export const Heading = tw.h1`font-bold text-[28px] md:text-[38px] text-white font-rubik`;
export const FeatureContainer = tw.div`px-[15px] md:px-[85px] py-[100px] flex items-center justify-center gap-[16px] w-full z-0 flex-col md:flex-row max-w-[1280px]`;
export const Feature = tw.div` max-w-[320px] h-[320px] bg-btn-black rounded-[16px] flex flex-col justify-center items-center gap-[16px] px-[16px] py-[8px]`;
export const FeatureHeading = tw.h2`text-white font-rubik font-bold text-[20px] md:text-[28px]`;
export const FeatureDesc = tw.p`text-[#C3C4D9] font-rubik font-normal text-[16px] text-center`;
export const FeatureIcon = tw.div`w-[160px] h-[160px] [&>*]:w-full [&>*]:h-auto`;
