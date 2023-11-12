import tw from "twin.macro";
export const QRCode = tw.div`
    w-[160px]
    h-[160px]
    border-[#636267]
    border-solid
    border-[1px]
    rounded-[8px]
    overflow-hidden
    flex
    justify-center
    items-center
    relative

`;
export const QRCodeText = tw.p`
    font-rubik
    text-[12px]
    text-[#636267]
    
`;
export const QRCodeImg = tw.image`
    absolute
    left-0
    top-0
`;

export const SetTwoFactorField = tw.div`
    flex
    justify-center
    items-center
    flex-col
    gap-[20px]
    w-full
    max-w-[360px]
`;
