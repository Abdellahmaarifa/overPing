import { IWallet } from './IWallet';
export class IUserProfile {
    id: number
    user_id: number
    nickname: string
    title: string
    xp: number
    rank: number
    about: string
    wallet: IWallet
    created_at: Date
    updated_at: Date
}