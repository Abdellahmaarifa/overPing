import tw from "twin.macro";

export const ChatBannerContainer = tw.div`
    w-full
    h-[40px]
    lg:border-b-[#1C232A]
    lg:border-b-[1px]
    top-0
    sticky
    flex
    lg:justify-end
    justify-between
    items-center
    lg:p-[8px]
    z-[100]
`;

export const ChatBannerLeft = tw.div`
    p-[12px]
    lg:hidden
    bg-[#0E1821]
    flex
    justify-center
    items-center
    rounded-tr-[8px]
    rounded-br-[8px]
    [box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);]
`;
export const ChatBannerRight = tw.div`
    flex
    gap-[12px]
    p-[12px]
    bg-[#0E1821]
    lg:bg-transparent
    rounded-tl-[8px]
    rounded-bl-[8px]
    lg:rounded-[0px]
    [box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);]
    lg:shadow-none
    relative
`;
export const ChatBannerIcon = tw.div`
    w-[24px]
    h-[24px]
    [&>svg]:w-full
    [&>svg]:h-full
    [&>svg]:fill-[rgba(128, 129, 147, 1)]
    cursor-pointer
    relative
`;

export const ExtraMenu = tw.div`
    w-[156px]
    absolute
    right-0
    top-[33px]
    bg-[#1F272E]
    rounded-[4px]
    flex
    flex-col
    gap-[8px]
    p-[16px]
`;

export const ExtraMenuLink = tw.span`
    text-[#B6BAC0]
    font-inter
    text-[12px]
    cursor-pointer

`;

export const ExtraMenuLinkDanger = tw.span`
    text-[#8E3928]
    font-inter
    text-[12px]
    cursor-pointer
`;
