import Button from "components/common/Button/Button";
import Input from "components/common/Input/Input";
import { Field, Form, Formik } from "formik";
import NotShowPass from "../../../assets/login/notShowPass.svg?react";
import ShowPassIcon from "../../../assets/login/showPass.svg?react";
import LoginViewModel from "./LoginViewModel";
import { Group } from "./Login.style";
import { LoginModelType } from "types/Login.type";
import { useStateWithGetSet } from "helpers";

const LoginView = () => {
  const viewModel = new LoginViewModel({
    error: useStateWithGetSet(""),
    showPass: useStateWithGetSet(false),
  });
  const { state } = viewModel;
  return (
    <Formik
      initialValues={viewModel.data}
      onSubmit={(values: LoginModelType) => viewModel.handleSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Group>
            <Field
              placeholder="Email address"
              name="email"
              border={false}
              id="email"
              as={Input}
              state={state.error.get}
            />
            <Field
              placeholder="Password"
              type={state.showPass.get ? "text" : "password"}
              name="password"
              id="password"
              as={Input}
              Icon={{
                activeIcon: ShowPassIcon,
                defaultIcon: NotShowPass,
                handler: state.showPass.set,
                active: state.showPass.get,
              }}
              state={state.error.get}
            />
          </Group>
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

export default LoginView;
