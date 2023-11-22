import tw from "twin.macro";

export const AchievementConatiner = tw.div`

    bg-green-500
    [grid-row: 3/4]
    grid
    [grid-template-columns: repeat(6, 41px)]
    [grid-template-rows: repeat(3, 75px)]
    md:[grid-template-columns: repeat(6, 59px)]
    md:[grid-template-rows: repeat(3, 108px)]
    w-full
    justify-center
    items-center
    min-h-fit
    m-auto
    gap-[5px]
    [&>*:nth-child(1)]:[grid-column: 2/3]
    [&>*:nth-child(2)]:[grid-column: 4/5]
    [&>*:nth-child(3)]:[grid-column: 6/7]
    [&>*:nth-child(4)]:[grid-column: 1/2]
    [&>*:nth-child(5)]:[grid-column: 3/4]
    [&>*:nth-child(6)]:[grid-column: 5/6]
    [&>*:nth-child(7)]:[grid-column: 2/3]
    [&>*:nth-child(8)]:[grid-column: 4/5]
    [&>*:nth-child(9)]:[grid-column: 6/7]
    [padding: 75px 135px 90px 80px]
    [background: radial-gradient(46.67% 53.19% at 51.2% 46.81%, #0088FF4F 0%, rgba(31, 39, 46, 0.00) 80%)]
`;
