import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { LoginModelType } from "domain/model/Login.type";

export class LoginModel implements LoginModelType {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = "";
  }
}
