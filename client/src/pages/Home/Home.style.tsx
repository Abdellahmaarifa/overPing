import tw from "twin.macro";

export const HomeConatiner = tw.div`w-full min-h-screen flex flex-col justify-start items-start gap-[32px] p-[15px] pt-[75px] md:ml-[72px]`;

export const HomeBody = tw.div`
w-full h-full xs:pl-[20px] xs:pr-[20px] md:pl-[49px] md:pr-[49px] flex justify-start items-center 
        flex-col gap-[32px]  2xl:[width: calc(100vw - 480px)]  2xl:items-center
`;

export const OverViewConatiner = tw.div`
flex justify-center items-center gap-[16px] flex-col w-full h-full md:max-w-[742px] 2xl:max-w-[950px] 
`;
