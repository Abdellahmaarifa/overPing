import tw, { styled } from "twin.macro";

export const TopNavBarContainer = tw.div`
    pr-[8px]
    pt-[4px] 
    pb-[4px] 
    pl-[8px] 
    flex 
    justify-between 
    items-center 
    h-[60px] 
    bg-[#0E1821] 
    w-full 
    fixed 
    z-[2] 
    md:bg-[#0F1A24]  
    md:pr-[12px] 
    md:pl-[12px] 
    md:h-[80px] 
    xl:pr-[72px]
`;

export const LogoContainer = tw.div`
    w-[60px] 
    h-auto 
    [&>*]:w-full
`;

export const UserBoxConatiner = tw.div`
    flex 
    gap-[16px] 
    md:gap-[12px] 
    justify-center 
    items-center
`;

export const MobileMenuIcon = tw.div`
    w-[24px] 
    h-[24px] 
    relative  
    cursor-pointer 
    rotate-0 
    [transition: .5s ease-in-out] 
    md:[display: none]
`;

export const MobileMenuIconElm: (props: {
  elm: string;
  open: boolean;
}) => string = styled.div`
  ${() => tw`absolute
    h-[3px]
    w-full
    bg-[#B4B5CF]
    opacity-[1]
    left-0
    rotate-0
    [transition: .25s ease-in-out]
    rounded-[10px]`}
  ${({ elm }) => elm === "1" && tw`top-[2px]`}
    ${({ elm }) => (elm === "2" || elm === "3") && tw`top-[10px]`}
    ${({ elm }) => elm === "4" && tw`top-[18px]`}
    ${({ elm, open }) =>
    (elm === "1" || elm === "4") && open && tw`top-[10px] w-[0] left-1/2`}
    ${({ elm, open }) => elm === "2" && open && tw`rotate-[45deg]`}
    ${({ elm, open }) => elm === "3" && open && tw`-rotate-[45deg]`}
`;

export const UserBoxSeparator = tw.div`
    [display: none] 
    md:block 
    h-[24px] 
    w-[1.5px]  
    [background: linear-gradient(
        0deg,
        rgba(118, 129, 146, 0.00) 0%,
        #394049 23.44%, #394049 78.13%,
        rgba(118, 129, 146, 0.00) 100%
    );]
`;

export const UserBox = tw.div`
    justify-center 
    items-center 
    gap-[14px] 
    [display: none] 
    md:flex 
    min-w-[156px] 
    relative 
    cursor-pointer
`;

export const UserImage = tw.div`
    h-[48px] 
    w-[48px] 
    bg-amber-400 
    rounded-[16px]
`;

export const UserInfo = tw.div`
    flex 
    flex-col 
    items-start 
    justify-center
`;

export const UserInfoNameConatiner = tw.div`
    flex 
    items-center 
    gap-[36px]
`;

export const UserInfoName = tw.span`
    font-rubik 
    text-[14px] 
    text-[white] 
    [font-weight: 500]
`;

export const UserInfoIcon = tw.div`
    w-[12px] 
    h-[12px] 
    [&>*]:w-full 
    [&>*]:h-full
`;

export const UserInfoStatusConatiner = tw.div`
    flex 
    items-center 
    gap-[6px]
`;

export const UserInfoStatusIcon = tw.div`
    w-[4px] 
    h-[4px] 
    bg-[#A8F63C] 
    rounded-[50%]
`;

export const UserInfoStatus = tw.span`
    text-[10px] 
    font-rubik 
    [font-weight: 400] 
    text-[#768192]
`;

export const UserBoxMenu = tw.div`
    min-w-[156px] 
    absolute 
    top-[110%] 
    bg-[#1F272E] 
    border-[1px] 
    border-[#4C4C57] 
    rounded-bl-[8px] 
    rounded-br-[8px] 
    flex 
    flex-col 
    items-center 
    justify-center 
    gap-[16px] 
    p-[16px]
`;

export const UserBoxMenuItem = tw.div`
    flex 
    items-center 
    justify-between 
    w-full 
    cursor-pointer
`;

export const UserBoxMenuItemText = tw.span`
    text-[12px] 
    font-inter 
    font-normal 
    text-[#B6BAC0] 
    [font-weight: 600]
`;
