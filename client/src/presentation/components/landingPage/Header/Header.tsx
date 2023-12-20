import ScrollIcon from "assets/landingPage/scroll.svg?react";
import { motion } from "framer-motion";
import HeadingSection from "../HeadingSection/HeadingSection";
import Navbar from "../Navbar/Navbar";
import HeaderContainer from "./Header.style";
const Header = () => {
  return (
    <HeaderContainer>
      <Navbar />
      <HeadingSection />
      <motion.div
        initial={{ y: -10 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ScrollIcon tw="w-[30px] md:w-[35px] h-[auto]" />
      </motion.div>
    </HeaderContainer>
  );
};

export default Header;
