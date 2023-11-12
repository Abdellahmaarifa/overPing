import tw from "twin.macro";
export const ChangePhotosContainer = tw.div`

    mb-[20px]
`;

export const ChangeBannerConatiner = tw.div`
    w-[90vw]
    max-w-[450px]
    h-[90px]
    bg-[rgba(217, 217, 217, 1)]
    relative
    cursor-pointer

`;

export const ChangeBannerText = tw.span`
    text-[8px]
    font-rubik
    text-[#374957]
`;

export const ChangeBannerIcon = tw.div`
    w-[12px]
    h-[12px]
    [&>*]:w-full
    [&>*]:h-full
`;

export const ChangeBannerCaption = tw.div`
    flex
    gap-[4px]
    absolute
    bottom-[4px]
    right-[4px]
`;
export const ChangeBannerInput = tw.input`
    w-full
    h-full
    absolute
    top-0
    left-0
    opacity-0
    cursor-pointer
`;
export const ChangeProfile = tw.div`
    relative
    -bottom-[40px]
    left-[27px]
`;

export const ChangeProfileInput = tw.input`
    w-full
    h-full
    opacity-0
    absolute
    top-0
    left-0
    cursor-pointer
`;

export const ChangeProfileIcon = tw.div`
    w-[12px]
    h-[12px]
    [&>*]:w-full
    [&>*]:h-full
    absolute
    bottom-[33px]
    left-[60px]
`;

export const ChangeInfoField = tw.div`
    flex
    justify-center
    items-center
    flex-col
    gap-[8px]
    w-full
    max-w-[360px]
`;

export const ChangeInfoFieldHeading = tw.h4`
    font-rubik
    text-[16px]
    [font-weight: 500]
    text-[#636472]

`;
