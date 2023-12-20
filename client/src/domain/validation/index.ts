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
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
  passwordConfirmation: (matchField: string) =>
    Yup.string()
      .min(8, "Must be at least 8 characters")
      .max(20, "Must be less  than 20 characters")
      .oneOf([Yup.ref(matchField)], "Passwords must match")
      .required("Password Confirmation is required")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
};

export default Validate;
