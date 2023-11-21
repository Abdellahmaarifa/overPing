import tw from "twin.macro";
export const ErrorModelContainer = tw.div`

    flex
    flex-col
    justify-center
    items-center
    gap-[40px]
`;

export const ErrorHeader = tw.h2`
    font-rubik
    text-[34px]
    text-[#CDCDDF]
    flex
    justify-center
    gap-[6px]
    items-center
`;

export const ErrorCode = tw.span``;
export const ErrorName = tw.span`
    text-[26px]
`;
export const ErrorSep = tw.span`
    text-[40px]
    [font-weight: 200]
    font-inter
    opacity-[.3]
    mr-[15px]
`;

export const ErrorImg = tw.img`
    w-[240px]

`;

export const ErrorDescription = tw.div`
    font-rubik
    text-[16px]
    text-[#CDCDDF]
    capitalize
    opacity-[.6]
    flex
    flex-col
    justify-center
    items-center
    gap-[10px]
    max-w-[350px]
    text-center
`;
