import tw from "twin.macro";

export const SignUpContainer = tw.form`
    bg-[#181B1F] 
    rounded-[8px] 
    w-full 
    h-full 
    sm:w-[600px] 
    sm:h-[536px] 
    border-[#1F272E] 
    border-solid 
    border-[1px]
    flex
    justify-start
    items-center 
    gap-[40px] 
    absolute 
    flex-col 
    p-[16px]
`;

export const SignUpHeading = tw.div`
    font-rubik 
    font-bold 
    text-[#B4B5CF] 
    text-[28px]
`;

export const SignUpGroup = tw.div`
    items-center 
    flex 
    flex-col 
    gap-[16px] 
    justify-center
`;
