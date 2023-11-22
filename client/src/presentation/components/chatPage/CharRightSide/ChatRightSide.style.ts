import tw from "twin.macro";
export const ChatRightSideContainer = tw.div`

    w-[288px]
    lg:w-[25%]

 h-full 
[background: linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #0F1A24]
max-w-[300px]
p-0
gap-[40px]
hidden
lg:flex
flex-col
absolute
lg:relative
right-0
top-[60px]
md:top-[80px]
lg:top-0
max-h-[calc(100vh - 60px)]
md:max-h-[calc(100vh - 80px)]
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
