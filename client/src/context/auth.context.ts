import { AUTH } from "../constants";

const TOKEN = localStorage.getItem(AUTH.token);

const initialState = {
  user: null,
};

if (TOKEN) {
  // we need to decode the token here.
  // remove the token if it is expired.
  //
}
