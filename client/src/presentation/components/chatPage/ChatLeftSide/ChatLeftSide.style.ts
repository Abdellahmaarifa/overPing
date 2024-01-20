import tw, { styled } from "twin.macro";
export const DMContainer = styled.div<any>(({ active }) => [
  tw`
    p-[12px]
    flex
    gap-[8px]
    bg-[#1C232A]
    rounded-[8px]
    w-full
    items-center
`,
  active && tw`[border: 1px solid aliceblue]`,
]);
export const DMProfile = tw.img`
    w-[48px]
    h-[48px]
    rounded-[16px]
    border-[3px]
    border-solid
    border-[#4C4C57]
`;
export const DMNameContainer = tw.div`
    flex
    flex-col
    items-start
    justify-between
    flex-1
`;
export const DMName = tw.h4`
    font-inter
    text-[14px]
    text-[#B4B5CF]
    [font-weight: 500]
`;
export const DMUserName = tw.span`
    font-inter
    text-[#8B8080]
    text-[12px]
    [font-weight: 500]

`;
export const DMCloseIcon = tw.div`

    w-[16px]
    h-[16px]
    [&>*]:w-full
    [&>*]:h-full
    mr-[14px]
`;

export const ChatLeftSideContainer = tw.div`
    w-[288px]
    lg:w-[25%]
    h-full
    hidden
    absolute
    lg:relative
    z-[10]
    lg:flex
    flex-col
    gap-[24px]
    bg-[#0F1A24]
    p-[5px]
    lg:p-0
    lg:[background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(180deg, rgba(15, 26, 36, 0.00) 0%, #0F1A24 100%)]
    max-h-[calc(100vh-80px)]
    max-w-[300px]
    overflow-scroll
`;
export const MessagesSearch = tw.div`
    w-full
    mb-[45px]
`;

export const MessagesBox = tw.div`
    w-full
    h-fit
    pl-[18px]
    pr-[18px]
    flex
    flex-col
    items-start
    gap-[24px]
`;
export const MessagesHeaderContainer = tw.div`
    w-full
    flex
    justify-between
    items-center

`;
export const MessagesHeader = tw.h2`
    font-rubik
    text-[16px]
    uppercase
    text-[#B4B5CF]

`;
export const MessagesHeaderIcon = tw.div`
    w-[16px]
    h-[16px]
    [&>*]:w-full
    [&>*]:h-full
    cursor-pointer
`;

export const MessagesContent = tw.div`
    flex
    flex-col
    gap-[10px]
    items-start
    w-full
`;

export const ChannelConatiner = styled.div<any>(({ active }) => [
  tw`
    flex
    items-start
    gap-[8px]
    bg-[#1C232A]
    rounded-[8px]
    p-[12px]
    w-full
    cursor-pointer`,
  active && tw`[border: 1px solid aliceblue]`,
]);
export const ChannelName = tw.h4`
    font-rubik
    text-[#A4A5BC]
    text-[14px]
    [font-weight: 500]
`;
export const ChannelIcon = tw.div`
    w-[24px]
    h-[24px]
    [&>*]:w-full
    [&>*]:h-full
`;
