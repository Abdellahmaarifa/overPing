import tw from "twin.macro";

export const Container = tw.div` flex items-center lg:items-end justify-center w-full h-[549px] px-[15px] md:px-[92px] mt-[150px] relative flex-col lg:flex-row max-w-[1280px] lg:m-auto gap-[60px] lg:gap-0`;
export const Content = tw.div`flex justify-center items-center lg:items-start flex-col px-[15px] w-[100%] lg:w-[40%] gap-[20px]`;
export const Img = tw.div`w-[100%] md:w-[60%] [&>*]:max-w-[780px] [&>*]:w-[100%] flex justify-center items-center `;
export const ContentHeading = tw.h1`text-white text-[28px] md:text-[38px] font-rubik font-normal`;
export const ContentDes = tw.p`text-white text-[16px] md:text-[21px] font-rubik font-normal leading-[24px] lg:max-w-[500px] mb-[60px] text-center lg:text-start`;
