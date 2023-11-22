import tw from "twin.macro";
export const MessageSenderCard = tw.div`
    w-[586px]
    h-fit
    min-h-[277px]
    rounded-[16px]
    bg-[#0E1821]
    absolute
    top-0
    left-[5px]
    pt-[24px]
    pb-[24px]
    pl-[16px]
    pr-[16px]
    flex
    justify-start
    items-center
    gap-[24px]
`;

export const MessageSenderCardImageContainer = tw.div`
    w-[229px]
    h-[229px]
    rounded-[16px]
    relative
    overflow-hidden
    flex
    justify-center
    items-center
`;
export const MessageSenderCardImage = tw.img`
    w-full
    h-full
`;
export const MessageSenderCardMask = tw.div`
    w-full
    h-full
    absolute
    top-0
    left-0
    bg-[rgba(57, 64, 73, 0.81)]
    z-[5]
    cursor-pointer
`;

export const MessageSenderCardImageText = tw.span`
    font-inter
    text-[16px]
    text-[#B4B5CF]
    [font-weight: 600]
    absolute
    z-[6]
    cursor-pointer
`;

export const MessageSenderCardInfo = tw.div`
    flex-1
    h-full
    flex
    flex-col
    justify-start
    items-start
`;

export const MessageSenderCardInfoNameConatiner = tw.div`
    mb-[34px]
    flex
    flex-col

`;
export const MessageSenderCardInfoName = tw.span`
    font-rubik
    text-[38px]
    text-[#B4B5CF]
    [font-weight: 700]
    capitalize
    
`;
export const MessageSenderCardInfoUserName = tw.span`
    font-rubik
    text-[21px]
    text-[#A4A5BC]
    [font-weight: 500]
    -mt-[15px]
`;

export const MessageSenderCardInfoStateConatiner = tw.div`
    flex
    w-full
    justify-between
    items-center
    rounded-[4px]
    bg-[#4C4C57]
    p-[8px]
    mb-[20px]

`;
export const MessageSenderCardInfoState = tw.div`
    rounded-[6px]
    bg-[#1F272E]
    flex
    justify-center
    items-center
    flex-col
    p-[8px]
    w-[30%]
`;

export const MessageSenderCardInfoStateName = tw.div`
    font-rubik
    text-[10px]
    text-[#B4B5CF]
    [font-weight: 500]
`;
export const MessageSenderCardInfoStateNumber = tw.div`
    text-[#B4B5CF]
    text-[17px]
    font-rubik
    [font-weight: 500]
`;
export const MessageSenderCardInfoActionConatiner = tw.div`
    self-end
    flex
    gap-[12px]
`;
