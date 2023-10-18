import { motion } from "framer-motion";
import tw, { styled } from "twin.macro";
import Logo from "assets/common/logo.svg?react";
import { createGlobalStyle } from "styled-components";

export const Container = tw.div`mx-auto w-full flex justify-between items-center px-[15px] md:px-[48px] lg:px-[96px] max-w-[1280px] min-w-[300px]`;
export const NavbarContainer = tw.div`bg-opacity-90  py-4 flex justify-between items-center  w-full`;
export const LogoContainer = tw(Logo)` font-bold text-lg h-16 w-auto`;
export const NavLinks = tw.div`hidden md:flex flex-grow justify-center gap-12`;
export const NavLink = tw.a`text-white hover:text-btn-white focus:text-btn-white transition duration-300 font-rubik`;
export const LoginButtonContainer = tw.div`hidden md:block`;
export const MobileMenuButton = tw.button`md:hidden text-white hover:text-gray-400 transition duration-300 relative z-10`;
export const MobileMenu = styled(motion.div)(({ isOpen }) => [
  tw`md:hidden bg-main bg-main fixed top-0 left-0 w-full h-full flex flex-col items-center p-4 space-y-4 transform transition-transform duration-300 ease-in-out`,
  isOpen ? tw`translate-x-0` : tw`translate-x-full`,
]);
export const MobileMenuItem = tw(motion(NavLink))`opacity-0`;

export const StopScroll = createGlobalStyle({
  body: {
    overflow: "hidden",
  },
});
