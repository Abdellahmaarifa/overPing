import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { LoginModelType } from "types/Login.type";

export class LoginModel implements LoginModelType {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}
