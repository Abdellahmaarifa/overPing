import tw from "twin.macro";
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
