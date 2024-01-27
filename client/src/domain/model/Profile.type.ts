export type Status = {
  best_win_streak: number;
  matchesLoss: number;
  matchesWon: number;
  totalMatches: number;
  win_streak: number;
  xp: number;
};

export type ProfileType = {
  id: string;
  about: string;
  cover: string;
  nickname: string;
  rank: number;
  displayRank: number;
  avatar: string;
  level: number;
  status: Status;
};

export type WalletType = {
  id: string;
  balance: number;
  user_id: number;
  betAmount: number;
};

export type GameStatusType = {
  matchesLoss: number;
  matchesWon: number;
  totalMatches: number;
  win_streak: number;
  best_win_streak: number;
};

export type AccountType = {
  findProfileByUserId: {
    id: string;
    user_id: number;
    nickname: string;
    title: string;
    xp: number;
    rank: number;
    displayRank: number;
    about: string;
    bgImageUrl: string;
    wallet?: WalletType;
    gameStatus: GameStatusType;
  };
  findUserById: {
    id: string;
    username: string;
    email: string;
    profileImgUrl: string;
  };
};

/*
type H = {
    findProfileByUserId
: 
about
: 
"Chatting my way through life on [overPing]. Let's keep the conversations rolling! ð±â¨ #Connected"
bgImageUrl
: 
"http://localhost:5500/image/profileBackGound/defaultCover.jpg"
gameStatus
: 
best_win_streak
: 
0
matchesLoss
: 
0
matchesWon
: 
0
totalMatches
: 
0
win_streak
: 
0
__typename
: 
"GQLGameStatusModel"
[[Prototype]]
: 
Object
id
: 
"2"
nickname
: 
"42maarifa1703955987652"
rank
: 
0
title
: 
"Challenger"
wallet
: 
{__typename: 'GQLWalletModel', id: '2', balance: 1500, betAmount: 0}
xp  
: 
0
__typename
: 
"GQLUserProfileModel"
[[Prototype]]
: 
Object
findUserById
: 
email
: 
"42maarifa@gmail.com"
id
: 
"2"
profileImgUrl
: 
"http://localhost:5500/image/avatar/defaultAvatar.jpg"
twoStepVerificationEnabled
: 
false
username
: 
"42maarifa"
__typename
: 
"GQLUserModel"
}

*/
