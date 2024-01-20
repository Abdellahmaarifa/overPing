import './Util.css'
import UserInfo from './UserInfo';
import { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import { useAccountQuery} from "gql/index";
import { useSearchParams } from "react-router-dom";
import { useUserContext } from "context/user.context";
import { BlockLike } from 'typescript';
import { playerTwo } from '../Game';
import e from 'express';

Howler.volume(1.0);
interface UtilProps 
{
    playerOne: UserInfo;
    playerTwo : UserInfo;
    updateUserInfoUtil: (newUtil: number) => void;
    updatePlayerOne : (newPlayWithRobot: boolean, newTabId: string, newMatchId: string, newMatchWager: number,
        newModePlaying: number, newUserName: string, newUserAvatar: string, newUserLogo: string, newMatchWon: number,
        newBestWinStreak: number, newMatchPlayed: number, newLevel: number, newTournentPlayed: number,
        newTournentWon: number, newPlayWithMouse: number, usrid : number, friend : boolean) => void;
    updatePlayerTwo: (newPlayWithRobot: boolean, newTabId: string, newMatchId: string, newMatchWager: number,
        newModePlaying: number, newUserName: string, newUserAvatar: string, newUserLogo: string, newMatchWon: number,
        newBestWinStreak: number, newMatchPlayed: number, newLevel: number, newTournentPlayed: number,
        newTournentWon: number, newPlayWithMouse: number, usrid : number, friend : boolean) => void;
}

let Util = ({ playerOne , playerTwo, updateUserInfoUtil, updatePlayerOne, updatePlayerTwo} : UtilProps ) =>
{
    let id1 : number = 0;
    let id2 : number = 0;
    const { user } =  useUserContext();
    // //if (playerOne.friend === false)
    // //{
    //     const { data, loading, error } = useAccountQuery({
    //         variables: {
    //           userId: Number(user?.id),
    //         },
    //       });
    // //}
    // if (playerOne.friend === true)
    // {
    //     const { data, loading, error } = useAccountQuery({
    //         variables: {
    //           userId: id2,
    //         },
    //       });
    // }
    const [params] = useSearchParams()


  
    const [accountQueryVariables, setAccountQueryVariables] = useState({
        userId: Number(user?.id),
      });
    
      const { data, loading, error } = useAccountQuery({
        variables: accountQueryVariables,
      });
    
      // useEffect to conditionally update accountQueryVariables when playerOne changes
      useEffect(() => {
        if (playerOne.friend === true) 
        {
            if (Number(user?.id) === Number(params.get("user1")))
            {
                id1 = Number(params.get("user1"));
                id2 = Number(params.get("user2"));
            }
            else
            {
                id1 = Number(params.get("user2"));
                id2 = Number(params.get("user1"));
            }
            setAccountQueryVariables({
                userId: id2,
            });
        }
      }, [playerOne]);




   // console.log("game params: ", params);
    let selectSound : any = new Howl({
        src: ['/Sounds/click-menu.mp3'],
        onload: () => {
          //console.log('Audio loaded successfully');
        },
        onloaderror: (error : any) => {
          console.error('Error loading audio:', error);
        },
      });



    const [Util, setUtil] = useState(0)
    
    let validateData = (Util : number) : undefined =>
    {
        if (Util !== 0)
        {
            console.log("the error is here >")
            updateUserInfoUtil(Util);
        }

        return (undefined)
    }

    if (loading) 
        return <h1>loading... util</h1>;
    else if (error)
        return <h1>Error!..</h1>
    else
    {
        let p1 : UserInfo = playerOne;
        if (params.get("type") === "computer")
        {
            p1.playWithRobot = true;   
        }
        if (playerOne.friend === false)
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
            //p1.playWithMouse = 1;
             if (data?.findProfileByUserId?.rank  as number < 100)
                 p1.userLogo = "/public/images/badge-1.png"
             if (data?.findProfileByUserId?.rank  as number >= 100 && data?.findProfileByUserId?.rank  as number < 200)
                 p1.userLogo = "/public/images/badge-2.png";
             if (data?.findProfileByUserId?.rank  as number >= 200)
                 p1.userLogo = "/public/images/badge-3.png";
            console.log("The params sent is : ", params, "\n and", params.get("type"), " .->  ",  p1.friend )
            // if (p1.friend === true)

            let friend = String(params.get("type"))
            const frie : String = String("\"friend\"");
            if (friend == frie)
            {
                p1.playWithMouse = 1;
                p1.modePlaying = 1;
                p1.matchWager = 100;
                p1.matchId = params.get("key") as string;
                p1.friend = true;
            }
            if (playerOne.userLogo.length === 0)
            {
                console.log("----> : ", p1.userAvatar);
                updatePlayerOne(p1.playWithRobot, p1.tabId, p1.matchId, p1.matchWager, p1.modePlaying, p1.userName,
                    p1.userAvatar,p1.userLogo, p1.matchWon, p1.bestWinStreak, p1.matchPlyed, p1.level, 
                    p1.tournentPlayed, p1.tournentWon, p1.playWithMouse,p1.userId, p1.friend);
            } 
        }

        let friend = String(params.get("type"))
        const frie : String = String("\"friend\"");
        if (friend == frie)
            p1.friend = true;
        if (playerOne.friend)
            {
                if (playerOne.userName === data?.findUserById.username)
                if (Number(user?.id) === Number(params.get("user1")))
                {
                    id1 = Number(params.get("user1"));
                    id2 = Number(params.get("user2"));
                }
                else
                {
                    id1 = Number(params.get("user2"));
                    id2 = Number(params.get("user1"));
                }
                    setAccountQueryVariables({
                        userId : id2,
                    }
                );
                let p2 : UserInfo = playerTwo;
                if (playerOne.tabId === params.get("user1"))
                    p2.tabId = params.get("user2") as string;
                else
                    p2.tabId = params.get("user1") as string;
                console.log( "user id : ", params.get("user1") , playerOne.tabId, p2.tabId);
                //p2.userName = user?.username as string;
                p2.playWithMouse = 1;
                p2.userName = data?.findUserById.username as string;
                p2.userAvatar = data?.findUserById.profileImgUrl as string;
                p2.matchPlyed = data?.findProfileByUserId?.gameStatus.totalMatches as number;
                p2.matchWon = data?.findProfileByUserId?.gameStatus.matchesWon as number;
                p2.bestWinStreak = data?.findProfileByUserId?.gameStatus.best_win_streak as number;
                p2.level = data?.findProfileByUserId?.xp as number;
                p2.tournentWon = data?.findProfileByUserId?.gameStatus.win_streak as number;
                p2.tournentPlayed = data?.findProfileByUserId?.gameStatus.matchesLoss as number;
                p2.userId = Number(data?.findUserById?.id);
                //p2.playWithMouse = 1;
                 if (data?.findProfileByUserId?.rank  as number < 100)
                     p2.userLogo = "/public/images/badge-1.png"
                 if (data?.findProfileByUserId?.rank  as number >= 100 && data?.findProfileByUserId?.rank  as number < 200)
                     p2.userLogo = "/public/images/badge-2.png";
                 if (data?.findProfileByUserId?.rank  as number >= 200)
                     p2.userLogo = "/public/images/badge-3.png";
                p2.modePlaying = 1;
                p2.matchWager = 100;
                p2.matchId = params.get("key") as string;
                if (playerTwo.userLogo.length === 0)
                {
                    updatePlayerTwo(p2.playWithRobot, p2.tabId, p2.matchId, p2.matchWager, p2.modePlaying, p2.userName,
                        p2.userAvatar, p2.userLogo, p2.matchWon, p2.bestWinStreak, p2.matchPlyed, p2.level, 
                        p2.tournentPlayed, p2.tournentWon, p2.playWithMouse, p2.userId, p2.friend);
                } 
                if (playerTwo.userLogo.length)
                {
                    console.log("Holy ply : ", playerOne,  playerTwo);
                    validateData(1);
                }
                else
                    console.log("ohh shit ", playerTwo);
            }
            
        return (
            <div className="UtilContainer" >
                <div className="UtilTitle"><p>Choose Util!</p></div>
                <div className="UtilHint">
                    <p>Select the util you want to play with!</p>
                </div>
                <div className="Utils">
                    <div className="UtilContainers" >
                        <div className={`util1 ${Util === 1 ? "hoverUtil1" : ""}`} onClick={ () => { selectSound.play(); setUtil(1)}}>
                            <div className='UtilImg U1'></div>
                            <div className='UtilName' ><p>Mouse</p></div>
                        </div>
                        <div className={`util2 ${Util === 2 ? "hoverUtil2" : ""}`} onClick={ () =>{ selectSound.play(); setUtil(2)}}>
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