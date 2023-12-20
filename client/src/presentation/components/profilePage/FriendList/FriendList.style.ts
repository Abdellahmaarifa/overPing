import tw from "twin.macro";

export const FriendListContainer = tw.div`
    w-full
    bg-[#0E1821]
    -mt-[30px]
    p-[20px]
    pt-[30px]
    rounded-[8px]
    flex
    flex-col
    items-center
    justify-center
    max-w-[1126px]
`;

export const FriendListWrapper = tw.div`
    grid
    w-full
    xs:grid-cols-2
    grid-cols-1
    md:grid-cols-3
    gap-[20px]
`;
export const Friend = tw.div`
    relative
    flex
    justify-start
    items-center
    gap-[10px]
`;
export const FriendImage = tw.div`
    w-[48px]
    h-[48px]
    rounded-[8px]
    overflow-hidden
`;

export const FriendInfo = tw.div`
    flex
    flex-col
    justify-center
    items-start

`;

export const FriendName = tw.span`
    font-inter
    text-[14px]
    text-white
`;
export const FriendUserName = tw.span`
    font-inter
    text-[12px]
    text-[#8B8080]
`;
export const FriendMenu = tw.div`
    absolute
    right-[16px]
    [&>svg]:w-[24px]
    [&>svg]:h-[24px]
`;
