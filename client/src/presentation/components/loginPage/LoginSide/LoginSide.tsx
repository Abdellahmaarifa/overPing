import React from "react";
import { LoginSideContainer, LoginSideWrapper } from "./LoginSide.style";
import BallImg from "assets/login/ball.svg?react";
import BracketBottomImg from "assets/login/bracket-bottom.svg?react";
import BracketTopImg from "assets/login/bracket-top.svg?react";
import tw from "twin.macro";

const a = tw.div``;
const LoginSide = () => {
  return (
    <LoginSideContainer>
      <LoginSideWrapper>
        <div tw="absolute top-[73px] right-[73px]">
          <BracketTopImg />
        </div>
        <div tw="absolute top-1/2 -translate-y-1/2 left-[40%]">
          <BallImg />
        </div>
        <div tw="absolute bottom-[102px] left-[131px]">
          <BracketBottomImg />
        </div>
      </LoginSideWrapper>
    </LoginSideContainer>
  );
};

export default LoginSide;
