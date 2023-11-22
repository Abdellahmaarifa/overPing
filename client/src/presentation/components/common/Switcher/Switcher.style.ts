import tw from "twin.macro";
export const SettingModelSwitcherField = tw.div`
    w-[vw]
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
    text-[10px]
    text-[#625959]
    [font-weight: 500]
`;

export const SettingModelSwitcherIcon = tw.div`
    w-[20px]
    h-[20px]
    [&>*]:w-full
    [&>*]:h-full
    [&>*]:fill-[#B4B5CF]
`;

export const SettingModelSwitcherHeader = tw.h4`
    font-rubik
    text-[12px]
    xs:text-[16px]
    text-[#B4B5CF]
    [font-weight: 500]
`;

export const SettingModelSwitcher = tw.label`
relative flex justify-between items-center  p-2 text-xl 
xs:w-[45px] w-[35px] h-[20px] xs:h-[25px] right-0 cursor-pointer 
`;
export const SettingModelSwitcherInput = tw.input`
absolute cursor-pointer left-1/2 -translate-x-1/2 w-full 
h-full  appearance-none rounded-md
    
`;
export const SettingModelSwitcherMask = tw.div`
  border-solid border-[3px] border-[#18578F] bg-[#1F272E] 
  box-border
  xs:w-[45px] xs:h-[25px] w-[35px] h-[20px] -ml-[10px] flex items-center 
  flex-shrink-0   p-[1px] xs:p-1  rounded-full duration-300
   ease-in-out peer-checked:bg-[#18578F]
   after:w-[15px] after:h-[15px] 
   after:bg-white after:rounded-full
    after:shadow-md after:duration-300 
    peer-checked:after:translate-x-[12px]
    xs:peer-checked:after:translate-x-[18px] 
    group-hover:after:translate-x-[1px]
`;
