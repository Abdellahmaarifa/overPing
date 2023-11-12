import tw from "twin.macro";

export const SettingConatiner = tw.div`
    cursor-pointer z-[30] w-screen h-screen bg-[#0000005c] fixed  top-0 left-0 flex justify-center items-center
`;

export const SettingMenuContainer = tw.div`
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

export const SettingMenuHeader = tw.h1`
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

export const SettingModelContainer = tw.div`
    w-full
    h-screen
    md:h-fit
    md:w-[800px]
    min-w-[300px]
    bg-[#0E1821]
    flex
    flex-col
    gap-[34px]
    justify-start
    items-center
    rounded-[8px]
    relative
    p-[54px]

`;

export const SettingBackIcon = tw.div`
    w-[24px]
    h-[24px]
    absolute
    top-[8px]
    left-[8px]
    [&>*]:w-full
    [&>*]:h-full
    cursor-pointer
    p-[4px]
`;

export const SettingModelHeader = tw.h2`
    font-rubik
    text-[#808193]
    text-[21px]
    [font-weight: 700]
    capitalize
    mb-[4px]
`;
export const SettingModelText = tw.p`
    font-rubik
    text-[#636267]
    [font-weight: 500]
    text-[16px]
    text-center
`;
