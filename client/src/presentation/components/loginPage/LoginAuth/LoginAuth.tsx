import BtnBack from "assets/login/btn-back.svg?react";
import Button from "components/common/Button/Button";
import Input from "components/common/Input/Input";
import StepLink from "components/common/StepLink/StepLink";
import { useAuthenticate_2faMutation } from "gql/index";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContainer, AuthHeader } from "./LoginAuth.style";
import { useUserContext } from "context/user.context";
const LoginAuth = () => {
  const [authenticate_2fa] = useAuthenticate_2faMutation();
  const [code, setCode] = useState<string | null>(null);
  const { user, updateUser } = useUserContext();
  const validate = async () => {
    try {
      await toast.promise(
        authenticate_2fa({
          variables: {
            code: code!,
          },
        }),
        {
          loading: "please wait..",
          success: ({ data }: any) => {
            console.log("the user: from validating 2FA: ", data);
            setTimeout(() => {
              //window.location.replace("/");
              updateUser(data.authenticate_2fa);
            }, 500);
            return "welcome back!";
          },
          error: (err) => {
            console.log("validing the code of 2FA: ", err);
            return "something went wrong";
          },
        }
      );
    } catch (err) {
      console.log("error from the server", err);
    }
  };

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
          console.log("codeing", code);
        }}
        placeholder="Numbers"
        type="text"
        $border={true}
        $theme="grey"
      />
      <Button
        $text="Next"
        $size="xl"
        $disabled={code ? false : true}
        onClick={() => {
          if (!code) return;
          validate();
        }}
      />

      <Toaster position="top-center" />
    </AuthContainer>
  );
};

export default LoginAuth;
