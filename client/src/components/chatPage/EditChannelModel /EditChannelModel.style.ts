import tw from "twin.macro";

export const ChannelModelConatiner = tw.div`
    w-full
    h-full
    absolute
    top-0
    right-0
    flex
    justify-center
    items-center
    z-[30]
    bg-[#000000ab]
`;

export const CreateChannelModel = tw.div`
    w-full
   max-w-[385px] 
   xs:rounded-[16px]
   p-[24px]
   bg-[#0E1821]
   h-full
   xs:h-fit
   flex
   flex-col
   gap-[24px]

`;

export const CreateChannelModelHeader = tw.h1`
    font-inter
    text-[24px]
    text-[#B4B5CF]
    [font-weight: 500]
`;

export const CreateChannelModelField = tw.div`
    gap-[12px]
    flex
    flex-col
   
`;
export const CreateChannelModelAction = tw.div`
    flex
    flex-col
    xs:flex-row
    items-center
    justify-between
    md:gap-[20px]
    gap-[10px]
`;

export const CreateChannelModelSubHeader = tw.h2`
    font-inter
    text-[14px]
    text-[#B4B5CF]
    [font-weight: 600]
    capitalize
`;

export const CreateChannelModelPassHeader = tw.h3`
    text-[#18578F]
    text-[14px]
    [font-weight: 600]
`;

export const EditLinkGroup = tw.div`
    flex
    justify-between
    items-center
    [font-weight: 700]
    text-[14px]
    font-inter
    pr-[20px]
`;

export const EditLinkName = tw.h3`
    text-[#B4B5CF]
`;

export const EditLinkAction = tw.span`
    text-[#18578F]
    cursor-pointer
    
`;
