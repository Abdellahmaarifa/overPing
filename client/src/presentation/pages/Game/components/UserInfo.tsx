import { Socket } from "socket.io-client";
import { MatchMode } from "./Achieve";
class UserInfo
{
    constructor (tabId : string, id: string, wager: number, mode: number, name: string,
        avatar: string, logo: string, mWon: number, bestWin: number,
        mPlayed: number, level: number, tPlayed: number, tWon: number, usrid : number) 
    {
        this.tabId = tabId;
        this.matchId = id;
        this.matchWager = wager;
        this.modePlaying = mode;
        this.userName = name;
        this.userAvatar = avatar;
        this.userLogo = logo;
        this.matchWon = mWon;
        this.bestWinStreak = bestWin;
        this.matchPlyed = mPlayed;
        this.level = level;
        this.tournentPlayed = tPlayed;
        this.tournentWon = tWon;
        this.userId = usrid;
    };

    socket : Socket | null = null;
    playWithRobot : boolean = false;
    tabId : string = "";
    matchId : string = "";
    matchWager : number = 0;
    modePlaying : number = 0;
    userName : string = "";
    userAvatar : string = "";
    userLogo : string = "";
    matchWon : number = 0;
    bestWinStreak : number = 0;
    matchPlyed : number = 0;
    level : number = 0;
    tournentPlayed : number = 0;
    tournentWon : number = 0;
    playWithMouse : number = 0;
    userId : number = 0;
    friend : boolean = false;
    ply2userId : number = 0;
    matchType : string = MatchMode.ONLINE_RANDOM;
    wallet : number = 10000;
};


export default UserInfo;