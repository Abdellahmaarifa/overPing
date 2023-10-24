import Button from "components/common/Button/Button";
import Input from "components/common/Input/Input";
import tw from "twin.macro";
import {
  LoginFooter,
  LoginFormContainer,
  LoginHeading,
  LoginSubHeading,
  LoginFooterLink,
} from "./LoginForm.style";
import GoogleIcon from "../../../assets/login/google.svg?react";
import IntraIcon from "../../../assets/login/42.svg?react";
import ShowPass from "../../../assets/login/showPass.svg?react";
import Seprator from "components/common/Seprator/Seprator";
const a = tw.div``;
const LoginForm = () => {
  return (
    <LoginFormContainer>
      <LoginHeading>Happening now</LoginHeading>
      <LoginSubHeading>Join Today.</LoginSubHeading>
      <div tw="w-[344px] h-auto flex flex-col [&>*:last-child]:mt-[40px] [&>*:last-child]:m-auto">
        <div tw="w-full mb-[32px] gap-[24px] flex justify-between items-center flex-col ">
          <Input placeholder="Email address " border={false} />
          <Input placeholder="Password" Icon={ShowPass} type="password" />
        </div>
        <Button text="Log in" size="xl" />
        <div tw=" mb-[22px] mt-[32px] ">
          <Seprator text="or" />
        </div>
        <div tw="flex justify-center items-center flex-col gap-[16px] w-full">
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
          don’t have account? <LoginFooterLink>Sing up</LoginFooterLink>
        </LoginFooter>
      </div>
    </LoginFormContainer>
  );
};

export default LoginForm;
