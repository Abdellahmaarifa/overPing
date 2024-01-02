import { AccountType, ProfileType } from "domain/model/Profile.type";
import { AccountQuery } from "gql";
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

export const GetUserProfile = (data: AccountQuery): ProfileType => {
  return {
    id: data.findProfileByUserId.id,
    about: data.findProfileByUserId.about,
    cover: encodeURI(data.findProfileByUserId.bgImageUrl as string),
    nickname: data.findProfileByUserId.nickname,
    rank: data.findProfileByUserId.rank,
    avatar: encodeURI(data.findUserById.profileImgUrl as string),
    level: data.findProfileByUserId.rank, // this should calculated
    status: {
      best_win_streak: data.findProfileByUserId.gameStatus.best_win_streak,
      matchesLoss: data.findProfileByUserId.gameStatus.matchesLoss,
      matchesWon: data.findProfileByUserId.gameStatus.matchesWon,
      win_streak: data.findProfileByUserId.gameStatus.win_streak,
      xp: data.findProfileByUserId.xp,
      totalMatches: data.findProfileByUserId.gameStatus.totalMatches,
    },
  };
};
