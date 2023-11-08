import tw from "twin.macro";

export const SettingConatiner = tw.div`
     w-screen h-screen bg-[#0000005c] fixed z-[10] top-0 left-0 flex justify-center items-center
`;

export const SettingModelContainer = tw.div`
    w-full
    h-screen
    md:h-fit
    md:w-[360px]
    bg-[#0E1821]
    rounded-[16px]
    p-[32px]
    flex
    flex-col
    justify-center
    items-center
    gap-[32px]
    font-rubik
    [font-weight: 700]
`;

export const SettingModelHeader = tw.h1`
    text-[28px]
    text-[#A4A5BC]
    uppercase
`;

export const SettingModelLink = tw.a`
    text-[16px]
    text-[#808193]
    capitalize
    cursor-pointer
`;

export const SettingModelLinkDanger = tw.a`
    text-[16px]
    text-[#8E3928]
    capitalize
    cursor-pointer
`;

export const CloseModelIcon = tw.div`
    [&>*]:w-[24px]
    [&>*]:h-[24px]
    absolute
    left-[8px]
    top-[8px]
    block
    md:hidden
`;

export const DeleteModelConatiner = tw.div`
    pl-[14px]
    pr-[14px]
    pt-[30px]
    pb-[30px]
    bg-[#0F1A24]
    rounded-[16px]
    font-rubik
    flex
    flex-col
    w-[360px]
    items-center
    justify-center
    gap-[16px]
`;

export const DeleteModelHeader = tw.h1`
    text-[#A4A5BC]
    text-[21px]
    [font-weight: 500]
    text-center
`;

export const DeleteModeltext = tw.p`
    text-[14px]
    text-[#808193]
    text-center
`;
export const DeleteModelButtonsContainer = tw.div`
    flex
    justify-between
    items-center
    w-full
`;
