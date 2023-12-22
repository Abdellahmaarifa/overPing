import Button from "components/common/Button/Button";
import Input from "components/common/Input/Input";
import { Field, Form, Formik } from "formik";
import NotShowPass from "assets/login/notShowPass.svg?react";
import ShowPassIcon from "assets/login/showPass.svg?react";
import LoginViewModel from "./LoginViewModel";
import { Group } from "./Login.style";
import { LoginModelType } from "types/Login.type";

const LoginView = () => {
  const viewModel = new LoginViewModel();
  const { state } = viewModel;
  return (
    <Formik
      initialValues={viewModel.data}
      onSubmit={(values: LoginModelType, { resetForm }) => {
        viewModel.handleSubmit(values);
        resetForm();
      }}
    >
      {({ values, isSubmitting, handleChange }) => (
        <Form>
          <Group>
            <Input
              placeholder="username"
              name="email"
              $border={false}
              id="email"
              $state={state.error.get}
              onChange={handleChange}
              value={values.email}
              $size="auto"
            />
            <Input
              placeholder="Password"
              type={state.showPass.get ? "text" : "password"}
              name="password"
              id="password"
              $Icon={{
                activeIcon: ShowPassIcon,
                defaultIcon: NotShowPass,
                handler: state.showPass.set,
                active: state.showPass.get,
              }}
              $state={state.error.get}
              onChange={handleChange}
              value={values.password}
              $size="auto"
            />
          </Group>
          <Button
            $text="Log in"
            $size="xl"
            type="submit"
            $disabled={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginView;
