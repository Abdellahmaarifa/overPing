import { IWallet } from './IWallet';
import { IGameStatus } from './IGameStatus'
export class IUserProfile {
    id: number
    user_id: number
    nickname: string
    title: string
    xp: number
    rank: number
    about: string
    bgImageUrl: string
    wallet: IWallet
    gameStatus: IGameStatus
}