import tw from "twin.macro";

export const ProfileMatchResaultContainer = tw.div`
 w-full 
 [grid-row: 2/4] 
    flex
    justify-start
    items-start
    flex-col
    gap-[10px]
    relative
    h-full
    xs:p-[25px]
    m-auto
    mb-[25px]
    max-w-[500px]
    xl:mt-[25px]
    
`;

export const ProfileMatchResaultHeading = tw.h3`
    font-rubik
    text-[#CDCDDF]
    text-[16px]

`;

export const ProfileResalut = tw.div`
    h-[52px]
    xl:h-[80px]
    w-full
    rounded-[12px]
    p-[8px]
    xl:p-[16px]
    flex
    justify-between
    items-center
    gap-[10px]
`;

export const ProfileMatchResalutImage = tw.img`
    w-[42px]
    h-[42px]
    xl:w-[48px]
    xl:h-[48px]
    rounded-[16px]
`;

export const MatchResault = tw.div`
    font-rubik
    text-[21px]
    xl:text-[28px]
    text-white
    [font-weight: 500]
    flex
    justify-center
    items-center
    gap-[24px]
`;

export const ProfileSeeMore = tw.div`
    w-[100px]
    h-[34px]
    xl:h-[40px]
    xl:w-[128px]
    bg-[#B4B5CF]
    rounded-[16px]
    text-[#1F272E]
    font-inter
    text-[10px]
    xl:text-[16px]
    flex
    justify-center
    items-center
    capitalize
    relative
    bottom-[20px]
    left-1/2
    -translate-x-1/2
    cursor-pointer
`;
