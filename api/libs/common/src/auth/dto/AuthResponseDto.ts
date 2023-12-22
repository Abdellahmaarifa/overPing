import { IAuthUser } from "../interface/auth.user.interface";

export class AuthResponseDto
{
  accessToken?: string;
  twoFactorAuth?: string;
  refreshToken?: string;
  user?: IAuthUser | null;
}
