import tw from "twin.macro";

export const SettingConatiner = tw.div`
     w-screen h-screen bg-[#0000005c] fixed z-[10] top-0 left-0 flex justify-center items-center
`;

export const SettingMenuContainer = tw.div`
    w-full
    h-screen
    md:h-fit
    md:w-[360px]
    bg-[#0E1821]
    rounded-[16px]
    p-[32px]
    flex
    flex-col
    justify-center
    items-center
    gap-[32px]
    font-rubik
    [font-weight: 700]
`;

export const SettingMenuHeader = tw.h1`
    text-[28px]
    text-[#A4A5BC]
    uppercase
`;

export const SettingModelLink = tw.a`
    text-[16px]
    text-[#808193]
    capitalize
    cursor-pointer
`;

export const SettingModelLinkDanger = tw.a`
    text-[16px]
    text-[#8E3928]
    capitalize
    cursor-pointer
`;

export const CloseModelIcon = tw.div`
    [&>*]:w-[24px]
    [&>*]:h-[24px]
    absolute
    left-[8px]
    top-[8px]
    block
    md:hidden
`;

export const DeleteModelConatiner = tw.div`
    pl-[14px]
    pr-[14px]
    pt-[30px]
    pb-[30px]
    bg-[#0F1A24]
    rounded-[16px]
    font-rubik
    flex
    flex-col
    w-[360px]
    items-center
    justify-center
    gap-[16px]
`;

export const DeleteModelHeader = tw.h1`
    text-[#A4A5BC]
    text-[21px]
    [font-weight: 500]
    text-center
`;

export const DeleteModeltext = tw.p`
    text-[14px]
    text-[#808193]
    text-center
`;
export const DeleteModelButtonsContainer = tw.div`
    flex
    justify-between
    items-center
    w-full
`;

export const SettingModelContainer = tw.div`
    w-full
    h-screen
    md:h-fit
    md:w-[800px]
    min-w-[300px]
    bg-[#0E1821]
    flex
    flex-col
    gap-[34px]
    justify-start
    items-center
    rounded-[8px]
    relative
    p-[54px]

`;

export const SettingBackIcon = tw.div`
    w-[24px]
    h-[24px]
    absolute
    top-[8px]
    left-[8px]
    [&>*]:w-full
    [&>*]:h-full
    cursor-pointer
    p-[4px]
`;

export const SettingModelHeader = tw.h2`
    font-rubik
    text-[#808193]
    text-[21px]
    [font-weight: 700]
    capitalize
    mb-[4px]
`;

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

export const SettingModelText = tw.p`
    font-rubik
    text-[#636267]
    [font-weight: 500]
    text-[16px]
    text-center
`;

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

export const SettingModelSwitcherField = tw.div`
    w-[vw]
    max-w-[300px]
    flex
    flex-col
    items-start
    justify-between
    gap-[2px]
    relative

`;

export const SettingModelSwitcherConatiner = tw.div`
    relative
    flex
    items-center
    justify-start
    gap-[8px]
    w-full
    [&>div]:w-full
    [&>div]:flex
    [&>div]:gap-[8px]

`;

export const SettingModelSwitcherDescription = tw.p`
    font-rubik
    text-[8px]
    text-[#625959]
    [font-weight: 500]
`;

export const SettingModelSwitcherIcon = tw.div`
    w-[18px]
    h-[18px]
    [&>*]:w-full
    [&>*]:h-full
`;

export const SettingModelSwitcherHeader = tw.h4`
    font-rubik
    text-[12px]
    text-[#636472]
    [font-weight: 500]
`;

export const SettingModelSwitcher = tw.label`
relative flex justify-between items-center  p-2 text-xl 
w-[29px] h-[16px] right-0 cursor-pointer 
`;
export const SettingModelSwitcherInput = tw.input`
absolute cursor-pointer left-1/2 -translate-x-1/2 w-full h-full  appearance-none rounded-md
    
`;
export const SettingModelSwitcherMask = tw.div`
w-[29px] h-[16px] -ml-[10px] flex items-center flex-shrink-0  p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-[15px] after:h-[15px] after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-[8px] group-hover:after:translate-x-[1px]
`;

export const GameStyleField = tw.div`

    w-full
    max-w-[360px]

`;

export const SetPassField = tw.div`
    flex
    justify-center
    items-center
    flex-col
    gap-[20px]
    w-full
    max-w-[360px]
`;

export const SetPassFieldHeading = tw.h4`
    font-rubik
    text-[16px]
    [font-weight: 500]
    text-[#636472]

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
