import React from "react";
import { SignUpContainer, SignUpGroup, SignUpHeading } from "./SignUp.style";
import StepLink from "components/common/StepLink/StepLink";
import Input from "components/common/Input/Input";
import Button from "components/common/Button/Button";
import CloseIcon from "../../../assets/login/btn-back.svg?react";
import Seprator from "components/common/Seprator/Seprator";
import GoogleIcon from "../../../assets/login/google.svg?react";
import IntraGoogle from "../../../assets/login/42.svg?react";
import { useState } from "react";
import tw from "twin.macro";
import PhotoIcon from "../../../assets/login/photoIcon.svg?react";
const SignUp = () => {
  const [step, setStep] = useState(2);
  return (
    <SignUpContainer>
      <StepLink text="Next">
        <CloseIcon />
      </StepLink>
      <SignUpHeading>Sign in to OverPing</SignUpHeading>
      {step === 0 ? (
        <>
          <SignUpGroup>
            <Button
              text="Create with Google"
              size="xl"
              Icon={GoogleIcon}
              transparent={true}
              border={true}
            />
            <Button
              text="Create With Intra"
              size="xl"
              Icon={IntraGoogle}
              transparent={true}
              border={true}
            />
          </SignUpGroup>
          <Seprator text="or" />
        </>
      ) : step === 1 ? (
        <>
          <SignUpGroup>
            <Input placeholder="Username" theme="grey" border={true} />
            <Input
              placeholder="Email address"
              type="text"
              theme="grey"
              border={true}
            />
          </SignUpGroup>
        </>
      ) : step === 2 ? (
        <>
          <SignUpGroup>
            <Input
              type="password"
              placeholder="Password"
              theme="grey"
              border={true}
            />
            <Input
              placeholder="Password"
              type="password"
              theme="grey"
              border={true}
            />
          </SignUpGroup>
        </>
      ) : (
        <>
          <div tw="w-[159px] h-[159px] bg-[#4C5258] rounded-[24px] [&>*]:w-[48px] [&>*]:h-[48px] flex justify-center items-center">
            <PhotoIcon />
          </div>
        </>
      )}
      <Button text="Create Account" size="xl" />
    </SignUpContainer>
  );
};

export default SignUp;
