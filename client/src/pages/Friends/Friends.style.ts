import tw from "twin.macro";

export const FriendsConatiner = tw.div`
    flex
    flex-col
    gap-[16px]
    relative
    top-[10px]
    sm:pr-[10px]
    sm:pl-[10px]
    p-[0]
    max-w-[1086px]
    [margin: auto]

`;

export const FriendsFilterConatiner = tw.div`
    flex
    flex-col
    gap-[16px]
    lg:flex-row-reverse
    lg:w-full
    lg:justify-between
`;

export const FriendsSearchConatiner = tw.div`
    flex
    justify-between
    items-center
    relative
    h-[40px]
    lg:w-[65vw]
    lg:max-w-[826px]
 `;

export const FriendSearch = tw.input`

    rounded-[3px]
    bg-[#0B121A]
    outline-0
    focus:outline-none
    pr-[10px]
    pl-[10px]
    h-full
    w-full

`;
export const FriendSearchIcon = tw.div`
    w-[24px]
    h-[24px]
    [&>*]:w-[24px]
    [&>*]:h-[24px]
    absolute
    right-[10px]
    top-1/2
    -translate-y-1/2
`;

export const FriendsFilter = tw.div`
    w-[200px]
    cursor-pointer
    flex
    justify-between
    lg:items-center
    lg:justify-between
    gap-[8px]
    relative
`;
export const FriendsFilterHeader = tw.h3`
    font-rubik
    text-[16px]
    uppercase
    text-[#B4B5CF]
`;

export const FriendList = tw.div`
    grid
    grid-cols-1
    xs:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    justify-center
    items-center
    gap-[8px]
    w-full
    xs:max-w-[450px]
    md:max-w-full
    [align-self: center]
`;

export const FriendProfile = tw.div`
    bg-[#1F272E]
    rounded-[8px]
    p-[16px]
    xs:p-[5px]
    sm:p-[16px]
    flex
    flex-col
    gap-[24px]
    w-fit
    m-auto
`;

export const FriendImageConatiner = tw.div`
    flex
    flex-col
    gap-[8px]
    w-full
`;
export const FriendImage = tw.div`
    rounded-[8px]
    w-[80vw]
    h-[250px]
    
    xs:w-[173px]
    xs:h-[147px]
`;
export const FriendName = tw.h3`
    font-inter
    text-[14px]
    text-[#B4B5CF]
`;

export const FriendAction = tw.div`
    flex
    flex-col
    gap-[8px]
    items-center
    justify-center
`;

export const FilterList = tw.div`
    w-[200px]
    bg-[#1F272E]
    border-[#4C5258]
    border-[1px]
    border-solid
    gap-[8px]
    p-[16px]
    flex
    flex-col
    justify-start
    items-start
    rounded-[4px]
    absolute
    left-[0]
    -bottom-[140px]
`;

export const FilterListItem = tw.h3`
    text-[#B4B5CF]
    text-[12px]
    font-inter
    [font-weight: 600]
`;
