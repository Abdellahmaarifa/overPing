import { IAuthUser } from "../interface/auth.user.interface";

export class AuthResponseDto
{
  accessToken: string;
  refreshToken: string;
  user: IAuthUser | null;

  constructor(accessToken: string, refreshToken: string, user: IAuthUser) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}
