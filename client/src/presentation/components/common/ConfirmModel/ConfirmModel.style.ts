import tw from "twin.macro";

export const ConfirmModelWrapper = tw.div`
    absolute
    h-screen
    w-screen
    flex
    justify-center
    items-center
     bg-[#0000005c]
     left-0
     top-0
     z-[30]
     
`;
export const ConfirmModelContainer = tw.div`
    w-[500px]
    h-[245px]
    rounded-[16px]
    p-[48px]
    bg-[#0E1821]
    gap-[32px]
    flex
    flex-col
`;

export const ConfirmModelText = tw.h2`
    font-rubik
    text-[27px]
    text-center
    text-[#A4A5BC]
`;

export const ConfirmModelAction = tw.div`
    flex
    justify-between
    items-center
    gap-[60px]
`;
