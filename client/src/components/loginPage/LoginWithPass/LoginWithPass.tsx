import NotShowPass from "../../../assets/login/notShowPass.svg?react";
import ShowPassIcon from "../../../assets/login/showPass.svg?react";
import { useLoginMutation } from "../../../graphql";
import { Field, Form, Formik, FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { useState } from "react";
import { useUserContext } from "context/user.context";
import Input from "components/common/Input/Input";
import tw from "twin.macro";
import Button from "components/common/Button/Button";
import { Values, submitHandler } from "./LoginWithPass.hooks";

const a = tw.div``;

const LoginWithPass = () => {
  const [showPass, SetShowPass] = useState(false);
  const [login] = useLoginMutation();
  const { signIn } = useUserContext();
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
        submitHandler(values, login, signIn, setSubmitting);
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
  );
};

export default LoginWithPass;
