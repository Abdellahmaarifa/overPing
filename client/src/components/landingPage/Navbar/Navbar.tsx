import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import tw, { styled } from "twin.macro";
import {
  NavbarContainer,
  Container,
  LogoContainer,
  NavLink,
  NavLinks,
  LoginButtonContainer,
  MobileMenu,
  MobileMenuButton,
  MobileMenuItem,
  StopScroll,
} from "./Navbar.style";
import Button from "components/common/Button/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav tw="w-full z-[1]">
      {isOpen && <StopScroll />}
      <NavbarContainer>
        <Container>
          <LogoContainer>Logo</LogoContainer>
          <NavLinks>
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#whyus">Why us</NavLink>
            <NavLink href="#meetus">Meet us</NavLink>
          </NavLinks>
          <LoginButtonContainer>
            <Button
              text="Login"
              border={true}
              transparent={true}
              link="login"
            />
          </LoginButtonContainer>
          <MobileMenuButton
            onClick={toggleMenu}
            css={isOpen ? "position:fixed; right:15px" : ""}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                tw="h-6 w-6 text-blue-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                tw="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </MobileMenuButton>
        </Container>
      </NavbarContainer>
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            <NavLinks tw="flex flex-col items-center space-y-2">
              <MobileMenuItem
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                href="#home"
                onClick={toggleMenu}
              >
                Home
              </MobileMenuItem>
              <MobileMenuItem
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                href="#whyus"
                onClick={toggleMenu}
              >
                Why us
              </MobileMenuItem>
              <MobileMenuItem
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                href="#meetus"
                onClick={toggleMenu}
              >
                Meet us
              </MobileMenuItem>
              <LoginButtonContainer tw="block">
                <Button
                  text="Login"
                  border={true}
                  transparent={true}
                  link="/login"
                />
              </LoginButtonContainer>
            </NavLinks>
          </MobileMenu>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
