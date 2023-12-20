import tw from "twin.macro";

export const NavbarContainer = tw.div`z-[20] pt-[32px] pb-[32px] pl-[12px] pr-[12px] w-[72px] fixed md:left-[0] right-0 bg-[#0F1A24] top-[60px] [height:calc(100vh - 60px)]  
flex-col items-center justify-start gap-[24px] border-solid border-r-[1px] border-[rgba(6, 11, 15, 0.3)] z-[1] hidden md:flex`;
export const Nav = tw.div`flex flex-col justify-start items-center gap-[24px]`;
export const NavLink = tw.div`w-[24px] h-[24px] cursor-pointer`;
export const ExitIcon = tw.div`w-[24px] h-[24px] absolute bottom-[16px] cursor-pointer`;
export const Seperator = tw.div`
    [background: linear-gradient(270deg, rgba(118, 129, 146, 0.00) 0%, #394049 23.44%, #394049 78.13%, rgba(118, 129, 146, 0.00) 100%)]
    h-[.5px]
    w-[32px]
    m-auto

`;
