import { Dispatch, SetStateAction } from "react";
export type StateWithGetSet<T> = {
  get: T;
  set: Dispatch<SetStateAction<T>>;
};
