import tw from "twin.macro";

export const HeadingSectionContainer = tw.div`
    flex
    justify-center
    items-center
    flex-col
    gap-[40px]
    p-[15px]
    lg:p-[92px]
`;

export const Heading = tw.h1`
    text-[20px]
    sm:text-[40px] 
    md:text-4xl 
    text-center 
    font-semibold 
    font-passero_one
`;

export const Paragraph = tw.p`
    text-btn-white 
    text-center  
    font-rubik 
    w-[100%] 
    lg:w-[664px]  
    sm:px-[20px] 
    text-[16px] 
    sm:text-[20px] 
    md:text-[28px] 
    leading-8 
`;

export const HeadingSpan = tw.span`font-passero_one 
    text-white 
    block 
    text-[40px] 
    sm:text-[50px]  
    md:text-[76px] 
    font-normal 
    mt-[-10px] 
    mb-[10px] 
    sm:mt-[-15px] 
    sm:mb-[15px] 
    md:mt-[-55px] 
    md:mb-[55px] 
`;

export const HeadingSpanSub = tw.span`
    font-passero_one 
    text-white 
    block 
    text-[40px] 
    sm:text-[50px]  
    md:text-[76px] 
    font-normal 
`;
