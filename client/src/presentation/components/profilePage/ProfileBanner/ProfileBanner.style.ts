import tw from "twin.macro";

export const BannerConatiner = tw.div`
bg-center bg-cover overflow-hidden
     z-[1] min-w-[300px] w-full h-[172px] rounded-bl-[14px] rounded-br-[14px] md:rounded-[16px] relative  max-w-[1126px] md:h-[256px] 
`;

export const BannerMenuConatiner = tw.div`
w-full h-[40px] md:h-[53px] absolute bottom-0 left-0  flex justify-end items-center p-[12px] md:p-[24px] gap-[12px] md:gap-[16px] rounded-[16px]
`;

export const BannerMenuMask = tw.div`
w-[770px] max-w-full min-w-[770px] md:min-w-[1126px] h-full  bg-profile-gradient absolute left-[0px] opacity-[.9] rounded-bl-[16px] rounded-br-[16px]
            [clip-path: polygon( 3.16% 0%,0% 0%,0% 100%,100% 100%,100% 0%,16.379% 0%,16.379% 0%,16.376% 0.052%,16.373% 0.103%,16.37% 0.153%,16.367% 0.201%,16.364% 0.247%,16.361% 0.292%,16.357% 0.336%,16.354% 0.377%,16.351% 0.418%,16.347% 0.456%,10.48% 64.651%,10.48% 64.651%,10.356% 65.847%,10.229% 66.781%,10.099% 67.451%,9.968% 67.857%,9.835% 68.001%,9.702% 67.88%,9.57% 67.496%,9.44% 66.849%,9.313% 65.937%,9.189% 64.762%,3.192% 0.447%,3.192% 0.447%,3.188% 0.409%,3.185% 0.37%,3.182% 0.329%,3.179% 0.287%,3.175% 0.243%,3.172% 0.197%,3.169% 0.15%,3.166% 0.101%,3.163% 0.051%,3.16% 0% )]
          
`;
export const BannerMenuButton = tw.div`
    [&>*]:fill-[#B4B5CF] cursor-pointer opacity-[.9] 
    [&>*]:w-[18px]
    [&>*]:h-[18px]
    [&>*]:md:w-[24px]
    [&>*]:md:h-[24px]
    relative

`;
export const ProfileConatiner = tw.div`
left-[30px] md:left-[45px] md:bottom-[28px] bottom-[20px] absolute  h-[100px] md:h-[140px] flex justify-center items-center gap-[20px]
`;

export const ProfileInfo = tw.div`
 flex flex-col items-start justify-center 
`;

export const ProfileName = tw.div`
font-rubik text-[12.5px] md:text-[18px] font-bold text-white capitalize
`;

export const ProfileLevel = tw.div`
font-rubik text-[#BDBCC3] text-[10px] md:text-[14px] capitalize
`;
export const ProfileWallet = tw.div`
font-rubik text-[#BDBCC3] text-[10px] md:text-[14px] capitalize
`;

export const BannerBadge = tw.div`
    top-[10px]
    right-[11px]
    md:top-[16px]
    md:right-[24px]
    absolute
    flex 
    flex-col
    items-center
    justify-center
`;

export const BannerBadgeImage = tw.div`
    [&>img]:w-[40px]
    [&>img]:md:w-[80px]
    [&>img]:[filter: drop-shadow(4px 2px 3.5px #000)]
`;

export const BannerBadgeGrade = tw.span`
    font-rubik font-bold text-[10px] md:text-[14px]
`;

export const ExtraMenu = tw.div`
    bg-[#1F272E]
    w-[156px]
    h-[76px]
    border-[1px]
    border-solid
    border-[#4C5258]
    rounded-[4px]
    p-[16px]
    absolute
    right-[10px]
    md:-right-[0]
    -bottom-[80px]
    z-10
    flex
    flex-col
    gap-[8px]
`;

export const ExtraLink = tw.a`
    text-[#8E3928]
    text-[12px]
    font-inter
    capitalize
    [font-weight: 600]
    cursor-pointer
`;
