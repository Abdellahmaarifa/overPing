import tw from "twin.macro";

export const LoginSideContainer = tw.div`
    w-[50%]
    max-w-[612px]
    h-full
    justify-end
    items-center
    max-h-[768px]
    hidden
    lg:flex
`;

export const LoginSideWrapper = tw.div`
    w-full
    h-full
    bg-login-gradient
    rounded-tr-[16px] 
    rounded-br-[16px] 
    relative
`;
