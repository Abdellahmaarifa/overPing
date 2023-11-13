import tw from "twin.macro";
export const ChatBodyContainer = tw.div`

relative
w-[50%] h-full 
flex-1 overflow-scroll
flex
flex-col
justify-start
items-center
[background: linear-gradient(180deg, rgba(18, 30, 41, 0.00) 0%, #121E29 100%)]
`;

export const ChatMessages = tw.div`
pl-[16px]
pr-[16px]
    w-full
    h-[100%]
    flex
    flex-col-reverse
    items-center
    overflow-scroll
    pb-[105px]
    [&::after]:[content: ""]
    [&::after]:absolute
    [&::after]:bottom-0
    [&::after]:w-full
    [&::after]:h-[140px]
    [&::after]:[background:linear-gradient(180deg, rgba(18,30,41,0) 0%, rgb(18, 30, 41) 60%)]
`;
export const SendMessageFeild = tw.div`
    flex
    justify-center
    items-center
    rounded-[12px]
    w-[100%]
    h-[90px]
    p-[16px]
    absolute
    bottom-0
`;

export const SendMessageInput = tw.input`
    w-[85%]
    outline-none
    focus:outline-none
    font-rubik
    text-[16px]
    h-[48px]
    text-[#A4A5BC]
    p-[16px]
    bg-[#1F272E]
    rounded-[12px]
`;

// banner top chat body

export const ChatBanner = tw.div`
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
`;
export const ChatBannerIcon = tw.div`
    w-[24px]
    h-[24px]
    [&>svg]:w-full
    [&>svg]:h-full
    [&>svg]:fill-[rgba(128, 129, 147, 1)]
    cursor-pointer
`;
// search model
