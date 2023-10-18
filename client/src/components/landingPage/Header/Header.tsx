import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import tw from "twin.macro";
import ScrollIcon from "assets/landingPage/scroll.svg?react";
import HeadingSection from "../HeadingSection/HeadingSection";
import Navbar from "../Navbar/Navbar";
import HeaderContainer from "./Header.style";
const Header = () => {
  const controls = useAnimation();

  useEffect(() => {
    const animation = async () => {
      while (false) {
        await controls.start({ y: -5 }, { duration: 0.6 });
        await controls.start({ y: 0 }, { duration: 0.6 });
      }
    };

    animation();
  }, [controls]);
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
