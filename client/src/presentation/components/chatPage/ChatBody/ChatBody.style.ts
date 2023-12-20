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
// search model
