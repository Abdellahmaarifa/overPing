import tw from "twin.macro";

export const ChatConatiner = tw.div`
    h-full
    w-full
    overflow-hidden
    pt-[15px]
    flex
`;

// RIGTH SIDE
export const ChatLeftSide = tw.div`
    w-[288px]
    lg:w-[25%]
    h-full
    flex
    flex-col
    gap-[24px]
    [background: linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(180deg, rgba(15, 26, 36, 0.00) 0%, #0F1A24 100%)]
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
`;

export const MessagesContent = tw.div`
    flex
    flex-col
    gap-[10px]
    items-start
    w-full
`;

export const ChannelConatiner = tw.div`
    flex
    items-start
    gap-[8px]
    bg-[#1C232A]
    rounded-[8px]
    p-[12px]
    w-full

`;
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

// LEFT SIDE

export const DMContainer = tw.div`
    p-[12px]
    flex
    gap-[8px]
    bg-[#1C232A]
    rounded-[8px]
    w-full
    items-center
`;
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

// right side
export const ChatRightSide = tw.div`

    w-[288px]
    lg:w-[25%]

 h-full 
[background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F1A24]
max-w-[300px]
p-0
gap-[40px]
flex
flex-col
`;

export const UserProfile = tw.div`
    relative
    w-full
    h-[99px]
`;
export const UserCover = tw.div`

    h-[99px]
    w-full
    bg-blue-500

`;
export const UserImage = tw.img`

    w-[64px]
    h-[64px]
    rounded-[16px]
    border-[3px]
    border-solid
    border-[#4C4C57]
    absolute
    -bottom-[25px]
    left-[15px]
`;

export const UserInfoWrapper = tw.div`
    p-[16px]
    flex
    flex-col
    gap-[40px]
`;
export const UserInformation = tw.div`
    bg-[#0D1013]
    p-[16px]
    flex
    flex-col
    gap-[24px]
    rounded-[8px]

`;

export const UserInfoFeild = tw.div`
    flex
    flex-col
    gap-[8px]
    font-inter
`;

export const UserInfoName = tw.h3`
    text-[14px]
    text-white
`;

export const UserInfoUserName = tw.div`
    text-[11px]
    text-[#D1D0D5]

`;

export const UserInfoAboutHeader = tw.h3`
    uppercase
    text-white
    text-[12px]
`;

export const UserInfoAbout = tw.p`
    text-[#D1D0D5]
    text-[11px]
`;

export const UserInfoStatusConatiner = tw.div`
    bg-[#4C4C57]
    rounded-[4px]
    gap-[16px]
    flex
    items-center
    w-full
    justify-between
    p-[8px]
`;

export const UserInfoStatus = tw.div`
    rounded-[6px]
    bg-[#1F272E]
    flex 
    flex-col
    justify-center
    items-center
    w-full
    p-[5px]
`;
export const UserInfoStatusHeading = tw.span`
    text-[10px]
    text-[#B4B5CF]
    font-inter
`;
export const UserInfoStatusRank = tw.span`
    font-rubik
    text-[17px]
    text-[#B4B5CF]
`;

// body
export const ChatBody = tw.div`

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

export const MessageContainer = tw.div`
    pt-[8px]
    pb-[8px]
    w-full
    flex
    gap-[8px]
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

export const Message = tw.div`
    text-[#A4A4A8]
    font-inter
    text-[16px]
`;

export const MessageImage = tw.img`
    w-[200px]
    h-[200px]
    rounded-[12px]
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
    border-b-[#1C232A]
    border-b-[1px]
    top-0
    sticky

`;

// search model
