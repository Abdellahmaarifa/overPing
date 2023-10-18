import tw, { styled } from "twin.macro";

export const FooterContainer = tw.footer`bg-[#151515] min-h-[345px] h-auto w-full flex flex-col justify-center items-center gap-[40px] py-[20px] mt-[350px] px-[15px]`;
export const FooterHeading = tw.h2`text-[21px] font-rubik font-bold text-white`;
export const FooterContent = tw.div`flex justify-center items-center gap-[20px] md:gap-[48px] flex-wrap`;
export const FooterCreator = tw.div`flex flex-col justify-center items-center gap-[20px] `;
export const FooterCreatorImg = tw.div`w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-[50%] border-2 border-[#227BC9] border-solid overflow-hidden [&>*]:w-full [&>*]:h-full`;
export const FoooterCreatorIcon = tw.div`w-[24px] h-[24px] [&>*]:w-full [&>*]:h-full`;
export const FooterCopyright = tw.h3`text-[12px] text-[#989898] font-normal font-poppins text-center`;
