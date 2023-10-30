import { FieldMetaProps, FormikProps, FormikValues } from "formik";
import { FormEvent } from "react";
import { StateWithGetSet } from "./helpers.type";
export interface SignUpModelType {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface SignUpViewModelType {
  data: SignUpModelType;
  state: SignUpViewState;
  handleFocus: (
    e: FormEvent<HTMLFormElement> & { target: { name: string } }
  ) => void;
  handleSubmit: (
    w: FormEvent<HTMLFormElement>,
    formikProps: FormikProps<SignUpModelType>
  ) => void;

  closeModel: () => void;
  goBack: () => void;
  getFieldState: (
    name: string,
    formikProps: FormikProps<SignUpModelType> | undefined
  ) => "valid" | "invalid" | undefined;
}

export interface SignUpViewState {
  fieldName: StateWithGetSet<string>;
  avatar: StateWithGetSet<string>;
  showPass: StateWithGetSet<boolean>;
  showPassConfirmation: StateWithGetSet<boolean>;
  shake: StateWithGetSet<boolean>;
  isEmailSubmitted: StateWithGetSet<boolean>;
  isPasswordSubmitted: StateWithGetSet<boolean>;
  avatarFile: StateWithGetSet<File | null>;
}
