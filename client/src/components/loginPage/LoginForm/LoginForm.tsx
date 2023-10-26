import Button from "components/common/Button/Button";
import Seprator from "components/common/Seprator/Seprator";
import LoginContextProvider from "context/login.context";
import { Toaster } from "react-hot-toast";
import IntraIcon from "../../../assets/login/42.svg?react";
import GoogleIcon from "../../../assets/login/google.svg?react";
import LoginWithPass from "../LoginWithPass/LoginWithPass";
import {
  LoginFooter,
  LoginFooterLink,
  LoginFormContainer,
  LoginHeading,
  LoginSubHeading,
} from "./LoginForm.style";
import { useLoginContext } from "context/login.context";
import tw from "twin.macro";

const a = tw.a``;
const LoginForm = () => {
  const { setShowRegister, showRegister } = useLoginContext();
  return (
    <LoginFormContainer>
      <LoginHeading>Happening now</LoginHeading>
      <LoginSubHeading>Join Today.</LoginSubHeading>
      <div tw="w-[344px] h-auto flex flex-col [&>*:last-child]:mt-[40px] [&>*:last-child]:m-auto">
        <div tw=" mb-[22px] mt-[32px] ">
          <LoginWithPass />
        </div>
        <Seprator text="or" />
        <div tw="flex justify-center items-center flex-col gap-[16px] w-full mt-[22px]">
          <Button
            text="log in with Google"
            border={true}
            transparent={true}
            size="xl"
            Icon={GoogleIcon}
          />
          <Button
            text="log in with Google"
            border={true}
            transparent={true}
            size="xl"
            Icon={IntraIcon}
          />
        </div>

        <LoginFooter>
          don’t have account?{" "}
          <LoginFooterLink
            onClick={() => {
              console.log("clicked");
              setShowRegister(true);
              console.log("now it is: ", showRegister);
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
