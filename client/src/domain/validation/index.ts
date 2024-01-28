import * as Yup from "yup";

const Validate = {
  username: () =>
    Yup.string()
      .min(8, "Must be at least 8 characters")
      .max(20, "Must be less  than 20 characters")
      .required("Username is required")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
  email: () =>
    Yup.string().email("Not proper Email").required("Email is required"),
  password: () =>
    Yup.string()
      .min(8, "Must be at least 8 characters")
      .max(20, "Must be less  than 20 characters")
      .required("Email is required")
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Passowrd Too weak"
      ),
  passwordConfirmation: (matchField: string) =>
    Yup.string()
      .min(8, "Must be at least 8 characters")
      .max(20, "Must be less  than 20 characters")
      .oneOf([Yup.ref(matchField)], "Passwords must match")
      .required("Password Confirmation is required")
      .matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        "Passowrd Too weak"
      ),
  nickname: () =>
    Yup.string()
      .min(6, "Must be at least 6 characters")
      .max(20, "Must be less than 20 characters")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
  about: () =>
    Yup.string()
      .min(50, "Must be at least 50 characters")
      .max(150, "Must be less than 150 characters"),
};

export default Validate;
