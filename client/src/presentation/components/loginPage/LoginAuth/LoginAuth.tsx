import React from "react";
import { AuthContainer, AuthHeader } from "./LoginAuth.style";
import Button from "components/common/Button/Button";
import Input from "components/common/Input/Input";
import BtnBack from "assets/login/btn-back.svg?react";
import StepLink from "components/common/StepLink/StepLink";
const LoginAuth = () => {
  return (
    <AuthContainer>
      <StepLink text="Step 1 of N">
        <BtnBack />
      </StepLink>
      <AuthHeader>
        Enter the 6-digit autthentication code generate by your app:
      </AuthHeader>
      <Input placeholder="Numbers" type="text" $border={true} $theme="grey" />
      <Button $text="Next" $size="xl" />
    </AuthContainer>
  );
};

export default LoginAuth;
