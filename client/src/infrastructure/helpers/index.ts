import { AccountType, ProfileType } from "domain/model/Profile.type";
import { AccountQuery } from "gql/index";
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
  console.log("data: AccountQuery ===> " ,data);
  return {
    id: data?.findProfileByUserId?.id!,
    about: data?.findProfileByUserId?.about!,
    cover: encodeURI(data?.findProfileByUserId?.bgImageUrl as string),
    nickname: data.findProfileByUserId?.nickname!,
    rank: data?.findProfileByUserId?.rank!,
    displayRank: data?.findProfileByUserId?.displayRank!,
    avatar: encodeURI(data?.findUserById?.profileImgUrl as string),
    level: data?.findProfileByUserId?.rank!, // this should calculated
    status: {
      best_win_streak: data?.findProfileByUserId?.gameStatus.best_win_streak!,
      matchesLoss: data?.findProfileByUserId?.gameStatus.matchesLoss!,
      matchesWon: data?.findProfileByUserId?.gameStatus.matchesWon!,
      win_streak: data?.findProfileByUserId?.gameStatus.win_streak!,
      xp: data?.findProfileByUserId?.xp!,
      totalMatches: data?.findProfileByUserId?.gameStatus.totalMatches!,
    },
    wallet:{
      id: data?.findProfileByUserId?.wallet.id!,
      balance : data?.findProfileByUserId?.wallet.balance!,
      betAmount : data?.findProfileByUserId?.wallet.balance!,
    },
  };
};

export const playWithUser = (
  id: number,
  sendGameInvitaion: any
): Promise<string> => {
  return new Promise(async (res, rej) => {
    const data = await sendGameInvitaion({
      variables: {
        JoinMatchmakingInput: {
          recipientId: Number(id),
          matchType: "classic",
        },
      },
    });
    if (data && data?.data?.sendRequestToPlay) {
      console.log(data);
      res("invitation sent successfuly");
    } else rej("failed to send invitaion! try again later");
  });
};
