import React, { useState } from "react";
import { AuthContainer, AuthHeader } from "./LoginAuth.style";
import Button from "components/common/Button/Button";
import Input from "components/common/Input/Input";
import BtnBack from "assets/login/btn-back.svg?react";
import StepLink from "components/common/StepLink/StepLink";
import {useAuthenticate_2faMutation} from "gql"
const LoginAuth = () => {
  const [authenticate_2fa] = useAuthenticate_2faMutation();
  const [code, setCode] = useState<string | null>(null);
  const validate = async () => {
      try {
      const {data} = await authenticate_2fa({
        variables: {
            code:code!
        }
      })
      console.log(data);
      window.location.replace("/");
    }catch(err)
    {
      console.log("error from the server", err)
    }

  }
  return (
    <AuthContainer>
      <StepLink text="Step 1 of N">
        <BtnBack />
      </StepLink>
      <AuthHeader>
        Enter the 6-digit autthentication code generate by your app:
      </AuthHeader>
      <Input 
      onChange={(e: any) => {
        setCode(e.target.value);
        console.log("codeing", code)
      }}
      placeholder="Numbers" type="text" $border={true} $theme="grey" />
      <Button $text="Next" $size="xl" 
        onClick={() => {
          validate();
        }}
      />
    </AuthContainer>
  );
};

export default LoginAuth;
