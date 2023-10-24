import tw from "twin.macro";

export const LoginFormContainer = tw.div`
    w-full 
    sm:w-1/2   
    sm:max-w-[392px] 
    h-fit 
    max-h-full 
    flex 
    flex-col 
    justify-center 
    items-center 
    lg:items-start 
    gap-[24px]
`;

export const LoginHeading = tw.h1`
    font-rubik 
    text-[#B4B5CF] 
    text-[42px] 
    md:text-[51px] 
    font-normal 
    leading-[48px]
`;

export const LoginSubHeading = tw.h2`
    text-[30px] 
    md:text-[38px] 
    font-rubik 
    font-normal 
    text-[#B4B5CF] 
    mb-[28px]
`;

export const LoginFooter = tw.footer`
    font-rubik 
    text-[16px] 
    font-normal 
    text-[#808193]
`;

export const LoginFooterLink = tw.a`
    text-[21px]
    font-bold
`;
