import { Dispatch, SetStateAction, useState } from "react";
import * as Yup from "yup";
type StateWithGetSet<T> = {
  get: T;
  set: Dispatch<SetStateAction<T>>;
};

export function useStateWithGetSet<T>(initialValue: T): StateWithGetSet<T> {
  const [value, setValue] = useState<T>(initialValue);

  return {
    get: value,
    set: setValue,
  };
}

export const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

// Validation using Yup

export const validate = {
  username: () =>
    Yup.string()
      .min(8, "Must be at least 8 characters")
      .max(20, "Must be less  than 20 characters")
      .required("Username is required")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
  email: () =>
    Yup.string()
      .min(8, "Must be at least 8 characters")
      .max(20, "Must be less  than 20 characters")
      .required("Email is required")
      .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
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
