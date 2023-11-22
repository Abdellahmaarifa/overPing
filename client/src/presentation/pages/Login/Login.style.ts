import tw from "twin.macro";

export const PageContainer = tw.div`
    relative 
    flex 
    justify-center 
    items-center 
    bg-[#0F1A24]
    lg:py-[128px]
    lg:px-[96px] 
    w-screen 
    h-screen 
    min-w-[350px]
`;

export const FormContainer = tw.div`
    flex 
    justify-around 
    items-center 
    w-[100%] 
    h-full 
    max-w-[1200px]
`;
