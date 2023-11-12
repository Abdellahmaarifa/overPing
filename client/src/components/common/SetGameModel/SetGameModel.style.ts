import tw from "twin.macro";
export const GameStyleConatiner = tw.div`
    w-[90vw]
    max-w-[450px]
    flex
    items-center
    justify-between
    bg-[#1F272E]
    rounded-[6px]
    h-[112px]
    p-[8px]
`;

export const GameStyle = tw.div`
    w-[136px]
    bg-[#4C5258]
    rounded-[6px]
    flex
    flex-col
    items-center
    justify-center
    gap-[8px]
    h-[90px]
    p-[2px]
`;

export const GameStyleImage = tw.img`
    w-full
    h-full
`;

export const GameStyleText = tw.span`
    font-rubik
    text-[12px]
    text-[#E8E8F0]
    [font-weight: 500]
`;

export const GameStyleField = tw.div`

    w-full
    max-w-[360px]

`;
