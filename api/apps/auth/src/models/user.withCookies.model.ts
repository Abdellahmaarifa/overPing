import { IAuthUser } from "../interface/auth.user.interface"

export class UserWithCookiesModel{
    acessToken : string
    refreshToken : string
    user : IAuthUser
}