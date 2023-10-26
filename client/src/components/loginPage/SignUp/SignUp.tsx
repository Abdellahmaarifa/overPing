import Button from "components/common/Button/Button";
import Input from "components/common/Input/Input";
import Seprator from "components/common/Seprator/Seprator";
import StepLink from "components/common/StepLink/StepLink";
import { useLoginContext } from "context/login.context";
import { Field, Formik } from "formik";
import { useState } from "react";
import tw from "twin.macro";
import * as Yup from "yup";
import IntraGoogle from "../../../assets/login/42.svg?react";
import CloseIcon from "../../../assets/login/btn-back.svg?react";
import GoogleIcon from "../../../assets/login/google.svg?react";
import PhotoIcon from "../../../assets/login/photoIcon.svg?react";
import { SignUpContainer, SignUpGroup, SignUpHeading } from "./SignUp.style";

import toast from "react-hot-toast";
const a = tw``;
interface Values {
  username: string;
  email: string;
  password_1: string;
  password_2: string;
}
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const SignUp = () => {
  const { setShowRegister, registerStep, setRegisterStep } = useLoginContext();
  const [fieldName, setFieldName] = useState<string>("");
  const [step, setStep] = useState(0);
  const [avatar, setAvatar] = useState("");
  const handleFocus = (e: any) => {
    console.log("foucs on :", fieldName);
    setFieldName(e.target.name);
  };
  const handleProfile = async (e, setFieldValue) => {
    const file = e.target.files[0];
    //check the size of image
    if (file?.size / 1024 / 1024 < 2) {
      const base64 = await convertToBase64(file);
      setFieldValue("profile_image", base64);
      console.log(base64);
    } else {
      toast.error("Image size must be of 2MB or less");
    }
  };
  return (
    <>
      <div
        tw="w-full h-full absolute bg-[rgba(38, 57, 73, 0.58)]"
        onClick={() => {
          setRegisterStep("reset");
          setShowRegister(false);
        }}
      ></div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password_1: "",
          password_2: "",
        }}
        onSubmit={(values: Values) => {}}
        validationSchema={Yup.object({
          username: Yup.string()
            .min(8, "Must be at least 8 characters")
            .max(20, "Must be less  than 20 characters")
            .required("Username is required")
            .matches(
              /^[a-zA-Z0-9]+$/,
              "Cannot contain special characters or spaces"
            ),
          email: Yup.string()
            .min(8, "Must be at least 8 characters")
            .max(20, "Must be less  than 20 characters")
            .required("Email is required")
            .matches(
              /^[a-zA-Z0-9]+$/,
              "Cannot contain special characters or spaces"
            ),

          password_1: Yup.string()
            .min(8, "Must be at least 8 characters")
            .max(20, "Must be less  than 20 characters")
            .required("Password is required")
            .matches(
              /^[a-zA-Z0-9]+$/,
              "Cannot contain special characters or spaces"
            ),
          password_2: Yup.string()
            .min(8, "Must be at least 8 characters")
            .max(20, "Must be less  than 20 characters")
            .oneOf([Yup.ref("password_1"), null], "Passwords must match")
            .required("Password Confirmation is required")
            .matches(
              /^[a-zA-Z0-9]+$/,
              "Cannot contain special characters or spaces"
            ),
        })}
      >
        {({ isSubmitting, values, getFieldMeta, setFieldValue }) => (
          <SignUpContainer
            onSubmit={(e) => {
              e.preventDefault();
              console.log("step: ", registerStep);
              if (registerStep === 1) {
                console.log(getFieldMeta("email").error);
                if (
                  getFieldMeta("username").error ||
                  getFieldMeta("email").error ||
                  !values.email ||
                  !values.username
                ) {
                  // nor validated!1
                  console.log("no way ", getFieldMeta("username").error);
                  return;
                }
                console.log("pas..");
              } else if (registerStep === 2) {
                if (
                  getFieldMeta("password_1").error ||
                  getFieldMeta("password_2").error ||
                  !values.password_1 ||
                  !values.password_2
                ) {
                  // not validated
                  console.log("not");
                  return;
                }
                console.log("passowrd ..");
              }
              if (registerStep < 3) setRegisterStep("next");
              console.log("submited...");
              if (registerStep === 3) {
                console.log("now we are going to create the user!");
              }
            }}
          >
            <StepLink
              text="Next"
              lastStep={3}
              onClick={() => {
                console.log("goinf back..", registerStep);
                setRegisterStep("prev");
              }}
            >
              <CloseIcon />
            </StepLink>
            <SignUpHeading>Sign in to OverPing</SignUpHeading>
            {registerStep === 0 ? (
              <>
                <SignUpGroup>
                  <Button
                    text="Create with Google"
                    size="xl"
                    Icon={GoogleIcon}
                    transparent={true}
                    border={true}
                  />
                  <Button
                    text="Create With Intra"
                    size="xl"
                    Icon={IntraGoogle}
                    transparent={true}
                    border={true}
                  />
                </SignUpGroup>
                <Seprator text="or" />
              </>
            ) : registerStep === 1 ? (
              <>
                <SignUpGroup>
                  <Field
                    as={Input}
                    placeholder="Username"
                    theme="grey"
                    border={true}
                    name="username"
                    id="username"
                    state={
                      values.username && getFieldMeta("username").error
                        ? "invalid"
                        : values.username
                        ? "valid"
                        : ""
                    }
                    onFocus={handleFocus}
                  />
                  <Field
                    as={Input}
                    placeholder="Email address"
                    type="text"
                    theme="grey"
                    border={true}
                    id="email"
                    name="email"
                    state={
                      values.email && getFieldMeta("email").error
                        ? "invalid"
                        : values.email
                        ? "valid"
                        : ""
                    }
                    onFocus={handleFocus}
                  />
                </SignUpGroup>
              </>
            ) : registerStep === 2 ? (
              <>
                <SignUpGroup>
                  <Field
                    as={Input}
                    type="password"
                    placeholder="Password"
                    theme="grey"
                    border={true}
                    name="password_1"
                    id="password_1"
                    state={
                      values.password_1 && getFieldMeta("password_1").error
                        ? "invalid"
                        : values.password_1
                        ? "valid"
                        : ""
                    }
                    onFocus={handleFocus}
                  />
                  <Field
                    as={Input}
                    placeholder="Password"
                    type="password"
                    theme="grey"
                    border={true}
                    name="password_2"
                    id="password_2"
                    state={
                      values.password_2 && getFieldMeta("password_2").error
                        ? "invalid"
                        : values.password_2
                        ? "valid"
                        : ""
                    }
                    onFocus={handleFocus}
                  />
                </SignUpGroup>
              </>
            ) : (
              <>
                <div tw="relative overflow-hidden w-[159px] h-[159px] bg-[#4C5258] rounded-[24px] [&>*]:w-[48px] [&>*]:h-[48px] flex justify-center items-center">
                  <input
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => {
                      const fileReader = new FileReader();
                      fileReader.onload = () => {
                        if (fileReader.readyState === 2) {
                          setFieldValue("avatar", fileReader.result);
                          setAvatar(fileReader.result);
                        }
                      };
                      fileReader.readAsDataURL(e.target.files[0]);
                    }}
                    tw="w-full h-full absolute opacity-0 cursor-pointer z-10"
                    type="file"
                  />
                  {avatar && (
                    <img src={avatar} alt="" tw="w-full h-full absolute z-0" />
                  )}
                  <PhotoIcon />
                </div>
              </>
            )}
            <Button
              text={registerStep === 0 ? "Create Account" : "Next"}
              size="xl"
              type="submit"
            />
            <div tw="text-[#f5425d83] font-rubik ">
              {fieldName ? getFieldMeta(fieldName).error : []}
            </div>
          </SignUpContainer>
        )}
      </Formik>
    </>
  );
};

export default SignUp;
