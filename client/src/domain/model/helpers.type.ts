import { Dispatch, SetStateAction } from "react";
export type StateWithGetSet<T> = {
  get: T;
  set: Dispatch<SetStateAction<T>>;
};

export type FriendshipStatusType =
  | "FRIENDS"
  | "REQUEST_SENT"
  | "REQUEST_RECEIVED"
  | "NOT_FRIENDS"
  | "BLOCKED"
  | "BLOCKED_BY";
