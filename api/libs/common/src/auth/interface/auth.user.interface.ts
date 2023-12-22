export class IAuthUser {
    id: number;
    username: string;
    email: string;
    googleId?: string;
    fortyTwoId?: string;
    refreshToken?: string;
    twoStepVerificationEnabled: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
  
