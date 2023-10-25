import Button from "components/common/Button/Button";
import Input from "components/common/Input/Input";
import Seprator from "components/common/Seprator/Seprator";
import { useUserContext } from "context/user.context";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import tw from "twin.macro";
import IntraIcon from "../../../assets/login/42.svg?react";
import GoogleIcon from "../../../assets/login/google.svg?react";
import NotShowPass from "../../../assets/login/notShowPass.svg?react";
import ShowPassIcon from "../../../assets/login/showPass.svg?react";
import { useLoginMutation } from "../../../graphql";
import {
  LoginFooter,
  LoginFooterLink,
  LoginFormContainer,
  LoginHeading,
  LoginSubHeading,
} from "./LoginForm.style";
import toast, { Toaster } from "react-hot-toast";

const notify = (status = "success") => {
  switch (status) {
    case "loading":
      toast.loading("loading..");
      break;
    case "error":
      toast.error("something went wrong!");
      break;
    default:
      toast.success("nice");
  }
};

const a = tw.div``;
interface Values {
  email: string;
  password: string;
}
const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

const submitHandler = async (
  values: Values,
  login: any,
  signIn: any,
  setSubmitting: any
) => {
  const LogUser = new Promise(async (res, rej) => {
    try {
      if (values.email == "") rej("please provide your email address.");
      if (values.password == "") rej("please provide your password.");
      await sleep(500);
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password,
        },
      });
      const accessToken = data?.login?.accessToken;
      res(accessToken);
      await sleep(500);
      signIn({ token: accessToken ? accessToken : null });
    } catch (err) {
      rej("Email or Password is incorrect!");
    }
  });
  toast.promise(LogUser, {
    loading: "Loading",
    success: (data) => `Good To see you again!`,
    error: (err) => {
      setSubmitting(false);
      return err;
    },
  });
};

const LoginForm = () => {
  const [showPass, SetShowPass] = useState(false);
  const [login] = useLoginMutation();
  const { signIn } = useUserContext();
  return (
    <LoginFormContainer>
      <LoginHeading>Happening now</LoginHeading>
      <LoginSubHeading>Join Today.</LoginSubHeading>
      <div tw="w-[344px] h-auto flex flex-col [&>*:last-child]:mt-[40px] [&>*:last-child]:m-auto">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(
            values: Values,
            { setSubmitting }: FormikHelpers<Values>
          ) => {
            submitHandler(values, login, signIn, setSubmitting);
            //setSubmitting(false);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div tw="w-full mb-[32px] gap-[24px] flex justify-between items-center flex-col ">
                <Field
                  placeholder="Email address "
                  border={false}
                  as={Input}
                  id="email"
                  name="email"
                />
                <Field
                  placeholder="Password"
                  Icon={{
                    activeIcon: ShowPassIcon,
                    defaultIcon: NotShowPass,
                    handler: SetShowPass,
                    active: showPass,
                  }}
                  type={showPass ? "text" : "password"}
                  id="password"
                  name="password"
                  as={Input}
                />
              </div>
              <Button
                text="Log in"
                size="xl"
                type="submit"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
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
      <Toaster position="top-center" />
    </LoginFormContainer>
  );
};

export default LoginForm;
