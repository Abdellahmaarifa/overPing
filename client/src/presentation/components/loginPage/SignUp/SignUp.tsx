import Button from "components/common/Button/Button";
import Input from "components/common/Input/Input";
import Seprator from "components/common/Seprator/Seprator";
import StepLink from "components/common/StepLink/StepLink";
import { Formik, FormikProps, Field } from "formik";
import tw from "twin.macro";
import IntraGoogle from "assets/login/42.svg?react";
import CloseIcon from "assets/login/btn-back.svg?react";
import GoogleIcon from "assets/login/google.svg?react";
import PhotoIcon from "assets/login/photoIcon.svg?react";
import { SignUpContainer, SignUpGroup, SignUpHeading } from "./SignUp.style";

import { motion } from "framer-motion";
import { useStateWithGetSet } from "helpers";
import { SignUpModelType, SignUpViewModelType } from "types/SignUp.type";
import NotShowPass from "assets/login/notShowPass.svg?react";
import ShowPassIcon from "assets/login/showPass.svg?react";
import { SignUpModel, SignUpModelSchema } from "./SignUpModel";
import SignUpViewModel from "./SignUpViewModel";
const a = tw``;

interface FormStepProps {
  viewModel: SignUpViewModelType;
  formikProps?: FormikProps<SignUpModelType>;
}

const SignUpFormStepOne = (_: FormStepProps) => {
  return (
    <>
      <SignUpGroup>
        <Button
          $text="Create with Google"
          $size="xl"
          $Icon={GoogleIcon}
          $transparent={true}
          $border={true}
        />
        <Button
          $text="Create With Intra"
          $size="xl"
          $Icon={IntraGoogle}
          $transparent={true}
          $border={true}
        />
      </SignUpGroup>
      <Seprator text="or" />
    </>
  );
};

const SignUpFormStepTwo = ({ viewModel, formikProps }: FormStepProps) => {
  return (
    <>
      <SignUpGroup>
        <Field
          as={Input}
          placeholder="Username"
          $theme="grey"
          $border={true}
          name="username"
          id="username"
          $state={viewModel.getFieldState("username", formikProps)}
          onChange={formikProps?.handleChange}
          value={formikProps?.values.username}
          onFocus={viewModel.handleFocus}
        />
        <Field
          as={Input}
          onFocus={viewModel.handleFocus}
          placeholder="Email address"
          type="text"
          $theme="grey"
          $border={true}
          id="email"
          name="email"
          $state={viewModel.getFieldState("email", formikProps)}
          onChange={formikProps?.handleChange}
          value={formikProps?.values.email}
        />
      </SignUpGroup>
    </>
  );
};

const SignUpFormStepThree = ({ viewModel, formikProps }: FormStepProps) => {
  const {
    state: { showPass, showPassConfirmation },
  } = viewModel;
  return (
    <>
      <SignUpGroup>
        <Field
          as={Input}
          onFocus={viewModel.handleFocus}
          placeholder="Password"
          $theme="grey"
          $border={true}
          name="password"
          id="password"
          $state={viewModel.getFieldState("password", formikProps)}
          $Icon={{
            activeIcon: ShowPassIcon,
            defaultIcon: NotShowPass,
            handler: showPass.set,
            active: showPass.get,
          }}
          type={showPass.get ? "text" : "password"}
          onChange={formikProps?.handleChange}
          value={formikProps?.values.password}
        />
        <Field
          as={Input}
          onFocus={viewModel.handleFocus}
          placeholder="Password"
          $theme="grey"
          $border={true}
          name="passwordConfirmation"
          id="passwordConfirmation"
          $state={viewModel.getFieldState("passwordConfirmation", formikProps)}
          $Icon={{
            activeIcon: ShowPassIcon,
            defaultIcon: NotShowPass,
            handler: showPassConfirmation.set,
            active: showPassConfirmation.get,
          }}
          type={showPassConfirmation.get ? "text" : "password"}
          onChange={formikProps?.handleChange}
          value={formikProps?.values.passwordConfirmation}
        />
      </SignUpGroup>
    </>
  );
};

const SignUpFormStepFour = ({ viewModel, formikProps }: FormStepProps) => {
  const {
    state: { avatar },
  } = viewModel;
  return (
    <>
      <div tw="relative overflow-hidden w-[159px] h-[159px] bg-[#4C5258] rounded-[24px] [&>*]:w-[48px] [&>*]:h-[48px] flex justify-center items-center">
        <input
          name="avatar"
          accept="image/*"
          onChange={(e) => {
            //formikProps?.handleChange(e);
            const fileReader = new FileReader();
            fileReader.onload = () => {
              if (fileReader.readyState === 2) {
                formikProps?.setFieldValue("avatar", fileReader.result);
                avatar.set(fileReader.result as string);
              }
            };
            fileReader.readAsDataURL(
              e.target.files ? e.target.files[0] : new Blob()
            );
            viewModel.state.avatarFile.set(
              e.target.files ? e.target.files[0] : null
            );
          }}
          tw="w-full h-full absolute opacity-0 cursor-pointer z-10"
          type="file"
        />
        {avatar.get && (
          <img src={avatar.get} alt="" tw="w-full h-full absolute z-0" />
        )}
        <PhotoIcon />
      </div>
    </>
  );
};

const SignUp = () => {
  const viewModel = new SignUpViewModel({
    fieldName: useStateWithGetSet(""),
    avatar: useStateWithGetSet(""),
    showPass: useStateWithGetSet(false),
    showPassConfirmation: useStateWithGetSet(false),
    shake: useStateWithGetSet(false),
    isEmailSubmitted: useStateWithGetSet(false),
    isPasswordSubmitted: useStateWithGetSet(false),
    avatarFile: useStateWithGetSet<File | null>(null),
  });

  const { state, loginContext } = viewModel;
  const motionShakeAnimation = state.shake.get
    ? {
        x: [0, -10, 10, -10, 10, 0],
        rotate: [0, -5, 5, -5, 5, 0],
        transition: {
          duration: 0.5,
        },
      }
    : {};
  return (
    <>
      <div
        tw="w-full h-full absolute bg-[rgba(38, 57, 73, 0.58)] cursor-pointer"
        onClick={viewModel.closeModel}
      ></div>
      <Formik
        initialValues={new SignUpModel()}
        onSubmit={(_: SignUpModelType, { resetForm }) => {
          resetForm();
        }}
        validationSchema={SignUpModelSchema()}
      >
        {(formikProps: FormikProps<SignUpModelType>) => (
          <motion.div
            initial={false}
            animate={motionShakeAnimation}
            tw="absolute w-full h-full sm:w-[600px] sm:h-[536px] "
          >
            <SignUpContainer
              onSubmit={(e) => {
                viewModel.handleSubmit(e, formikProps);
              }}
            >
              <StepLink text="Next" lastStep={3} onClick={viewModel.goBack}>
                <CloseIcon />
              </StepLink>
              <SignUpHeading>Sign in to OverPing</SignUpHeading>
              {loginContext.registerStep === 0 ? (
                <SignUpFormStepOne
                  viewModel={viewModel}
                  formikProps={formikProps}
                />
              ) : loginContext.registerStep === 1 ? (
                <SignUpFormStepTwo
                  viewModel={viewModel}
                  formikProps={formikProps}
                />
              ) : loginContext.registerStep === 2 ? (
                <SignUpFormStepThree
                  viewModel={viewModel}
                  formikProps={formikProps}
                />
              ) : (
                <SignUpFormStepFour
                  viewModel={viewModel}
                  formikProps={formikProps}
                />
              )}
              <Button
                $text={
                  loginContext.registerStep === 0 ? "Create Account" : "Next"
                }
                $size="xl"
                type="submit"
              />
              <div tw="text-[#f5425d83] font-rubik ">
                {state.fieldName.get
                  ? formikProps.getFieldMeta(state.fieldName.get).error
                  : []}
              </div>
            </SignUpContainer>
          </motion.div>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
