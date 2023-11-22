import tw from "twin.macro";

export const AuthContainer = tw.div`
    w-full 
    h-full 
    sm:w-[550px] 
    sm:h-[312px] 
    sm:min-h-[312px] 
    bg-[#181B1F] 
    rounded-[8px] 
    border-solid 
    border-[#1F272E] 
    border-[1px]
    flex 
    flex-col 
    justify-start 
    sm:justify-between 
    items-center 
    gap-[40px] 
    p-[16px] 
    absolute 
    pb-[40px] 
    box-border
`;

export const AuthHeader = tw.div`
    font-rubik 
    text-[#B4B5CF]
    font-bold 
    text-[16px]
`;
