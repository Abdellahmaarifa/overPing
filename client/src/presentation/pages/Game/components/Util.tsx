import './Util.css'
import UserInfo from './UserInfo';
import { useState, useEffect } from 'react';
import { useAccountQuery} from "gql/index";
import { useSearchParams } from "react-router-dom";
import { useUserContext } from "context/user.context";
import { MatchMode } from './Achieve';

interface UtilProps 
{
    playerOne: UserInfo;
    playerTwo : UserInfo;
    updateUserInfoUtil: (newUtil: number) => void;
    updatePlayerOne : (newPlayWithRobot: boolean, newTabId: string, newMatchId: string, newMatchWager: number,
        newModePlaying: number, newUserName: string, newUserAvatar: string, newUserLogo: string, newMatchWon: number,
        newBestWinStreak: number, newMatchPlayed: number, newLevel: number, newTournentPlayed: number,
        newTournentWon: number, newPlayWithMouse: number, usrid : number, friend : boolean, ply2userId : number, matchType : string) => void;
    updatePlayerTwo: (newPlayWithRobot: boolean, newTabId: string, newMatchId: string, newMatchWager: number,
        newModePlaying: number, newUserName: string, newUserAvatar: string, newUserLogo: string, newMatchWon: number,
        newBestWinStreak: number, newMatchPlayed: number, newLevel: number, newTournentPlayed: number,
        newTournentWon: number, newPlayWithMouse: number, usrid : number, friend : boolean, ply2userId : number, matchType : string) => void;
}

let Util = ({ playerOne , playerTwo, updateUserInfoUtil, updatePlayerOne, updatePlayerTwo} : UtilProps ) =>
{
    let id1 : number = 0;
    let id2 : number = 0;
    const { user } =  useUserContext();
 
    const [params] = useSearchParams()
    const { data, loading, error } = useAccountQuery({
        variables: {
            userId: Number(user?.id),
        },
        });
  
    const [accountQueryVariables, setAccountQueryVariables] = useState({
        userId: Number(user?.id),
      });
    


    const [Util, setUtil] = useState(0)
    
    let validateData = (Util : number) : undefined =>
    {
        if (Util !== 0)
        {
            updateUserInfoUtil(Util);
        }

        return (undefined)
    }

    if (loading) 
        return <h1>loading... util</h1>;
    else if (error)
        return <h1>Error!...util</h1>
    else
    {
        let p1 : UserInfo = playerOne;
        if (params.get("type") === "computer")
        {
            p1.modePlaying = Math.floor(Math.random() * 3) + 1;
            p1.playWithMouse = 1;
            p1.matchWager = 100;
            p1.playWithRobot = true;
            p1.friend = false;
            p1.matchType = MatchMode.VS_COMPUTER;
        }
        let friend = String(params.get("type"))
        const frie : String = String("\"friend\"");
        if (friend == frie)
        {
            p1.playWithMouse = 1;
            p1.modePlaying = 1;
            p1.matchWager = 100;
            p1.matchId = params.get("key") as string;
            p1.friend = true;
            p1.matchType = MatchMode.VS_FRIENDS;
        }
        setTimeout( () => 
        {
            //if (playerOne.friend === false)
            {
                p1.tabId = user?.id as string;
                p1.userName = user?.username as string;
                p1.userAvatar = data?.findUserById.profileImgUrl as string;
                p1.matchPlyed = data?.findProfileByUserId?.gameStatus.totalMatches as number;
                p1.matchWon = data?.findProfileByUserId?.gameStatus.matchesWon as number;
                p1.bestWinStreak = data?.findProfileByUserId?.gameStatus.best_win_streak as number;
                p1.level = data?.findProfileByUserId?.xp as number;
                p1.tournentWon = data?.findProfileByUserId?.gameStatus.win_streak as number;
                p1.tournentPlayed = data?.findProfileByUserId?.gameStatus.matchesLoss as number;
                p1.userId = Number(data?.findUserById?.id);
                if (Number(user?.id) === Number(params.get("user1")))
                    p1.ply2userId = Number(params.get("user2"));
                else
                    p1.ply2userId = Number(params.get("user1"));
                if (data?.findProfileByUserId?.rank  as number < 100)
                    p1.userLogo = "/images/badge-1.png"
                if (data?.findProfileByUserId?.rank  as number >= 100 && data?.findProfileByUserId?.rank  as number < 200)
                    p1.userLogo = "/images/badge-2.png";
                if (data?.findProfileByUserId?.rank  as number >= 200)
                    p1.userLogo = "/images/badge-3.png";

                if (playerOne.userLogo.length === 0)
                {
                    updatePlayerOne(p1.playWithRobot, p1.tabId, p1.matchId, p1.matchWager, p1.modePlaying, p1.userName,
                        p1.userAvatar,p1.userLogo, p1.matchWon, p1.bestWinStreak, p1.matchPlyed, p1.level, 
                        p1.tournentPlayed, p1.tournentWon, p1.playWithMouse,p1.userId, p1.friend, p1.ply2userId, p1.matchType);
                } 
                if (p1.friend)
                {
                    updateUserInfoUtil(1);
            
                }
            }
        }, 500)
        if (playerOne.friend)
        {
            setTimeout(() => {
                updateUserInfoUtil(1);
            }, 7000)
        }
        
        //console.log("THIS TIME OUT IS WORKING!!")
            
        return (
            <div className="UtilContainer" >
                <div className="UtilTitle"><p>Choose Util!</p></div>
                <div className="UtilHint">
                    <p>Select the util you want to play with!</p>
                </div>
                <div className="Utils">
                    <div className="UtilContainers" >
                        <div className={`util1 ${Util === 1 ? "hoverUtil1" : ""}`} onClick={ () => { setUtil(1)}}>
                            <div className='UtilImg U1'></div>
                            <div className='UtilName' ><p>Mouse</p></div>
                        </div>
                        <div className={`util2 ${Util === 2 ? "hoverUtil2" : ""}`} onClick={ () =>{  setUtil(2)}}>
                            <div className='UtilImg U2'></div>
                            <div className='UtilName'><p>Keyboard</p></div>
                        </div>
                    </div>
                </div>
                <div className='UntilConfirm'>
                    <button onClick={ () => validateData(Util) }>Confirm</button>
                </div>
            </div>
        )
    }
};

export default Util;