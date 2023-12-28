export class IAuthUser {
    id: number;
    username: string;
    googleId?: string;
    fortyTwoId?: string;
    refreshToken?: string;
    twoStepVerificationEnabled: boolean;
    profileId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
  
