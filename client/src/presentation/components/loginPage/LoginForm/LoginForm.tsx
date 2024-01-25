import IntraIcon from "assets/login/42.svg?react";
import GoogleIcon from "assets/login/google.svg?react";
import Button from "components/common/Button/Button";
import Seprator from "components/common/Seprator/Seprator";
import { Toaster } from "react-hot-toast";
//import LoginWithPass from "../LoginWithPass/LoginWithPass";
import LoginView from "../Login/LoginView";

import { useLoginContext } from "context/login.context";
import { useNavigate } from "react-router-dom";
import tw from "twin.macro";
import {
  LoginFooter,
  LoginFooterLink,
  LoginFormContainer,
  LoginHeading,
  LoginSubHeading,
} from "./LoginForm.style";

const a = tw.a``;
const LoginForm = () => {
  const { setShowRegister, showRegister } = useLoginContext();
  const navigate = useNavigate();
  return (
    <LoginFormContainer>
      <LoginHeading>Happening now</LoginHeading>
      <LoginSubHeading>Join Today.</LoginSubHeading>
      <div tw="w-[344px] h-auto flex flex-col [&>*:last-child]:mt-[40px] [&>*:last-child]:m-auto">
        <div tw=" mb-[22px] mt-[32px] ">
          <LoginView />
        </div>
        <Seprator text="or" />
        <div tw="flex justify-center items-center flex-col gap-[16px] w-full mt-[22px]">
          <Button
            $text="log in with Google"
            $border={true}
            $transparent={true}
            $size="xl"
            $Icon={GoogleIcon}
            onClick={() => {
               window.location.href = "http://localhost:5500/auth/google";
            }}
          />
          <Button
            $text="log in with Intra"
            $border={true}
            $transparent={true}
            $size="xl"
            $Icon={IntraIcon}

            onClick={() => {
               window.location.href = "http://localhost:5500/auth/42";
            }}
          />
        </div>

        <LoginFooter>
          don’t have account?{" "}
          <LoginFooterLink
            onClick={() => {
              //console.log("clicked", showRegister);
              setShowRegister(true);
              //console.log("now it is: ", showRegister);
            }}
          >
            Sing up
          </LoginFooterLink>
        </LoginFooter>
      </div>
      <Toaster position="top-center" />
    </LoginFormContainer>
  );
};

export default LoginForm;
