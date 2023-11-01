import React from "react";
import tw from "twin.macro";
import PingBoy from "assets/home/ping_boy.png";
import {
  BannerContainer,
  BannerText,
  BannerImage,
  BannerSubtitle,
  BannerTitle,
  Span,
} from "./HomeBanner.style";

const HomeBanner = () => {
  return (
    <BannerContainer>
      <BannerText>
        <BannerTitle>
          Welcome Back <Span>Salma</Span>
        </BannerTitle>
        <BannerSubtitle>
          Play today with us, find and discover the best player in our game,
          chat and get to know other people.
        </BannerSubtitle>
      </BannerText>
      <BannerImage src={PingBoy} alt="overping" />
    </BannerContainer>
  );
};

export default HomeBanner;
