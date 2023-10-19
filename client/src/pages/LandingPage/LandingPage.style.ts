import tw from "twin.macro";

const PageContainer = tw.div`
    bg-main
    overflow-hidden
    w-full
    relative
`;

export const Blob = tw.div`
    w-[110vw] 
    h-[110vw] 
    absolute 
    rounded-full  
    bg-ellipsLinearGradient 
    filter 
    blur-md 
    left-1/2  
    -translate-y-1/2 
    -translate-x-1/2 
    overflow-hidden 
    max-w-[1408px] 
    max-h-[1408px]
`;

export default PageContainer;
