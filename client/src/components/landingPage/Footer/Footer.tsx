import React from "react";
import {
  FooterContent,
  FooterContainer,
  FooterCreator,
  FooterCreatorImg,
  FoooterCreatorIcon,
  FooterCopyright,
  FooterHeading,
} from "./Footer.style";
import AyoubImg from "assets/landingPage/team/ayoub.png";
import IlyasImg from "assets/landingPage/team/ilyas.png";
import MaarifaImg from "assets/landingPage/team/maarifa.png";
import TariqImg from "assets/landingPage/team/tariq.png";
import GithubIcon from "assets/landingPage/github.svg?react";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterHeading>Create with love by :</FooterHeading>
      <FooterContent>
        <FooterCreator>
          <FooterCreatorImg>
            <img src={AyoubImg} alt="" />
          </FooterCreatorImg>
          <FoooterCreatorIcon>
            <GithubIcon />
          </FoooterCreatorIcon>
        </FooterCreator>
        <FooterCreator>
          <FooterCreatorImg>
            <img src={IlyasImg} alt="" />
          </FooterCreatorImg>
          <FoooterCreatorIcon>
            <GithubIcon />
          </FoooterCreatorIcon>
        </FooterCreator>
        <FooterCreator>
          <FooterCreatorImg>
            <img src={MaarifaImg} alt="" />
          </FooterCreatorImg>
          <FoooterCreatorIcon>
            <GithubIcon />
          </FoooterCreatorIcon>
        </FooterCreator>
        <FooterCreator>
          <FooterCreatorImg>
            <img src={TariqImg} alt="" />
          </FooterCreatorImg>
          <FoooterCreatorIcon>
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
