import tw from "twin.macro";

export const MessageContainer = tw.div`
    pt-[8px]
    pb-[8px]
    w-full
    flex
    gap-[8px]
    z-0
`;
export const MessageProfile = tw.img`
    w-[48px]
    h-[48px]
    rounded-[16px]

`;
export const MessageInfo = tw.div`
    flex
    flex-col
    gap-[8px]

`;
export const MessageSender = tw.div`
    flex
    gap-[8px]
    items-center
    relative
`;
export const MessageSenderName = tw.div`
    text-white
    text-[14px]
    font-inter
    [font-weight: 500]

`;
export const MessageSenderDate = tw.div`
    font-inter
    text-[#636267]
    text-[12px]
    [font-weight: 500]
`;

export const MessageSample = tw.div`
    text-[#A4A4A8]
    font-inter
    text-[16px]
`;

export const MessageImage = tw.img`
    w-[200px]
    h-[200px]
    rounded-[12px]
`;
