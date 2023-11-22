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

// add padd to number

export const withPad = (n: number) => n.toString().padStart(2, "0");
