import tw from "twin.macro";

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
