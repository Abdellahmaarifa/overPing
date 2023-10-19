import GithubIcon from "assets/landingPage/github.svg?react";
import AyoubImg from "assets/landingPage/team/ayoub.png";
import IlyasImg from "assets/landingPage/team/ilyas.png";
import MaarifaImg from "assets/landingPage/team/maarifa.png";
import TariqImg from "assets/landingPage/team/tariq.png";
import {
  FoooterCreatorIcon,
  FooterContainer,
  FooterContent,
  FooterCopyright,
  FooterCreator,
  FooterCreatorImg,
  FooterHeading,
} from "./Footer.style";

const Footer = () => {
  return (
    <FooterContainer id="meetus">
      <FooterHeading>Create with love by :</FooterHeading>
      <FooterContent>
        <FooterCreator>
          <FooterCreatorImg href="https://github.com/bouCactus" target="_blank">
            <img src={AyoubImg} alt="" />
          </FooterCreatorImg>
          <FoooterCreatorIcon
            href="https://github.com/bouCactus"
            target="_blank"
          >
            <GithubIcon />
          </FoooterCreatorIcon>
        </FooterCreator>
        <FooterCreator>
          <FooterCreatorImg href="https://github.com/medilyas" target="_blan">
            <img src={IlyasImg} alt="" />
          </FooterCreatorImg>
          <FoooterCreatorIcon href="https://github.com/medilyas" target="_blan">
            <GithubIcon />
          </FoooterCreatorIcon>
        </FooterCreator>
        <FooterCreator>
          <FooterCreatorImg
            href="https://github.com/Abdellahmaarifa"
            target="_blank"
          >
            <img src={MaarifaImg} alt="https://github.com/Abdellahmaarifa" />
          </FooterCreatorImg>
          <FoooterCreatorIcon
            href="https://github.com/Abdellahmaarifa"
            target="_blank"
          >
            <GithubIcon />
          </FoooterCreatorIcon>
        </FooterCreator>
        <FooterCreator>
          <FooterCreatorImg href="https://github.com/tariqelb" target="_blank">
            <img src={TariqImg} alt="" />
          </FooterCreatorImg>
          <FoooterCreatorIcon
            href="https://github.com/tariqelb"
            target="_blank"
          >
            <GithubIcon />
          </FoooterCreatorIcon>
        </FooterCreator>
      </FooterContent>
      <FooterCopyright>
        Copyright © 2023 PingPong them All rights reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
