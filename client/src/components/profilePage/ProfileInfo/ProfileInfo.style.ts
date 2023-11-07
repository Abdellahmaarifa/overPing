import tw from "twin.macro";
export const ProfileInfoConatiner = tw.div`
    flex
    flex-col
    gap-[8px]
    justify-center
    items-center
    w-full
    relative
    p-[16px]
    md:p-0
    md:flex-row
    md:justify-between
    max-w-[1126px]
`;

export const ProfileInfoTab = tw.div`
    bg-[#1F272E]
    w-full
    flex
    justify-center
    items-center
    h-[25px]
    rounded-[8px]
    overflow-hidden
    md:hidden
`;
export const ProfileInfoTabHeader = tw.div`
    w-1/2
    flex
    justify-center
    items-center
    h-full
`;
export const ProfileInfoTabHeading = tw.h2`
    font-rubik
    text-[12px]
    text-[#4C5258]
    font-bold
`;

export const ProfileInfoBody = tw.div`
    rounded-[8px]
    flex
    flex-col
    lg:grid
    [grid-template-columns: 1fr .5fr]
    xl:[grid-template-rows: 145px 65px 1fr]
    gap-[24px]
    w-full


`;
export const ProfileBioConatiner = tw.div`
    md:flex-[30%]
    md:bg-[#1F272E]
    md:p-[24px]
    md:rounded-[8px]
    lg:h-[200px]
    flex
    flex-col
    justify-start
    gap-[10px]
    [grid-row: 1/2]
    
`;
export const BioHeader = tw.h3`
    font-rubik
    text-[18px]
    font-bold
    text-[#B4B5CF]
    hidden
    md:block
`;
export const ProfileBio = tw.p`
    text-[#808193]
    font-rubik
    text-[13px]
    md:text-[15px]
    lg:text-[16px]
`;

export const ProfileStatus = tw.div`
    grid
    grid-cols-1
    xs:grid-cols-2
    xl:grid-cols-3
    xl:[grid-template-columns: 1.5fr 2.5fr 2fr]
    gap-[16px]
    md:flex-[70%]
    md:bg-[#1F272E]
    md:p-[45px]
    md:rounded-[8px]
    [grid-row: 1/3]
    md:[max-height: 333px]
    xl:[max-height: 233px]
`;
export const ProfileBadge = tw.div`
    bg-[#B4B5CF]
    rounded-[4px]
    p-[9px]
    flex
    justify-between
    items-center
`;
export const ProfileBadgeIcon = tw.div`
    [&>*]:w-[24px]
    [&>*]:h-[24px]

    [&>*]:md:w-[30px]
    [&>*]:md:h-[30px]
   [&>*]:lg:w-[40px]
    [&>*]:lg:h-[40px]
`;
export const ProfileBadgeInfo = tw.div`
    flex
    flex-col
    justify-center
    items-end
`;
export const ProfileBadgeName = tw.span`
    font-inter
    text-[10px]
    md:text-[14px]
    lg:text-[16px]
    text-black
`;
export const ProfileBadgeRank = tw.span`
    font-inter
    text-[10px]
    md:text-[16px]
    text-black
    font-bold
`;
