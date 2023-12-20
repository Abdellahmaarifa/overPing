import tw from "twin.macro";

export const ChatSearchContainer = tw.div`
    flex
    justify-center
    items-center
    w-full
    h-full
    bg-[#000000ab]
    absolute 
    z-[30]
    top-0
    left-0

`;
export const ChatSearchModel = tw.div`
    relative
    bg-[#0E1821]
    md:rounded-[16px]
    md:w-[612px]
    md:h-[464px]
    w-full
    h-full
    flex
    flex-col
    justify-start
    items-center
    p-[30px]
    pt-[80px]
    gap-[20px]
`;
export const ChatSearchIcon = tw.div`
    absolute
    w-[30px]
    h-[30px]
    top-[30px]
    right-[15px]
`;
export const ChatSearchField = tw.div`
    overflow-hidden
    rounded-[4px]
    border-[#161C21]
    border-solid
    border-[1px]
    relative
    w-[90%]
    h-[50px]
 
    

`;
export const ChatSearchInput = tw.input`
    w-full
    h-full
    p-[8px]
    bg-[#161C21]
    placeholder:text-[#4C4C57]
    placeholder:font-rubik
    placeholder:text-[16px]
`;

export const ChatSearchInputIcon = tw.div`
    [&>svg]:fill-[rgba(76, 76, 87, 1)]
    absolute
    right-[10px]
    top-1/2
    -translate-y-1/2
`;

export const ChatResaultContainer = tw.div`
    flex flex-col justify-start
    items-center
    w-full
    h-full
`;
export const ChatSearchResault = tw.div`
    rounded-[8px]
    w-[90%]
    h-[65px]
    flex
    gap-[12px]
    justify-start
    items-center
    p-[12px]
    hover:bg-[#4C5258]
    relative
    [&:hover>div:last-child]:block
`;
export const ChatSearchResaultCloseIcon = tw.div`
    absolute
    top-1/2
    -translate-y-1/2
    right-[15px]
    hidden

`;

export const ChatSearchResaultIcon = tw.div`
    [&>svg]:fill-[rgba(180, 181, 207, 1)]
    w-[48px]
    h-[48px]
    flex
    justify-center
    items-center
    [&>svg]:w-[30px]
    [&>svg]:h-[30px]
`;
export const ChatSearchResaultName = tw.h3`
    text-[#B4B5CF]
    text-[14px]
    [font-weight: 500]
    capitalize
`;
export const ChatSearchResaultImage = tw.img`
    w-[48px]
    h-[48px]
    rounded-[16px]
`;

export const ChatSearchNameConatiner = tw.div`
    flex
    flex-col
    items-start
    justify-center
    gap-[10px]
    [&>span]:text-[12px]
    [&>span]:text-[rgba(139, 128, 128, 1)]
    [&>span]:-mt-[10px]
    h-full
`;
