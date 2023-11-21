import { IAuthUser } from "../interface/auth.user.interface";

export class AuthResponseDto
{
  accessToken: string;
  refreshToken: string;
  user: IAuthUser | null;
  error: string | null;

  constructor(accessToken: string, refreshToken: string, user: IAuthUser | null, error: string | null) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = user;
    this.error = error;
  }
}
