export class IAuthUser {
    id: number;
    username: string;
    email?: string;
    profileImgUrl: string;
    googleId?: string;
    fortyTwoId?: string;
    refreshToken?: string;
    lastSeen?: Date;
    twoStepVerificationEnabled?: boolean;
    showUpdateWin?: boolean;
}

export class IUser {
    id: number;
    username: string;
    email: string;
    lastSeen: Date;
    profileImgUrl: string;
}
  

