import tw from "twin.macro";

export const TabContainer = tw.div`
hidden w-full h-[24px] xs:flex lg:hidden justify-between items-center rounded-[4px] bg-[#1F272E] overflow-hidden
`;

export const Tab = tw.div`
w-1/2 flex justify-center items-center  h-full cursor-pointer
`;

export const TabHeading = tw.div`
text-[12px]  font-rubik font-normal
`;

export const RightSideConatiner = tw.div`
2xl:fixed 2xl:top-[120px] 2xl:right-[50px] w-full h-auto  2xl:w-[380px] flex flex-col items-center gap-[10px] 2xl:gap-[16px] 
`;
