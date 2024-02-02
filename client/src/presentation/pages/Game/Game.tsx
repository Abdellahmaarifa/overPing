import './Game.css'
import App from "./components/App";
import Info from "./components/Info";
import GameContainer from "./components/gamecontainer";
import UserInfo from './components/UserInfo';
import Modes from "./components/Modes";
import Deposit from "./components/Deposit";
import Waiting from "./components/Waiting";
import Ready from "./components/Ready";
import Util from "./components/Util";
import { useEffect, useState } from "react";
import { tabId } from "./components/App";
import Congratulation from "./components/Congratulation";
import BetterLuck from "./components/BetterLuck";
import ServerDown from './components/ServerDown';
import { useUserContext } from "context/user.context";
import { gql } from 'apollo-server-express';
import { UserProfile } from 'components/chatPage/CharRightSide/ChatRightSide.style';
import { useAccountQuery, useFindProfileByUserIdQuery } from "gql/index";
import {useSearchParams} from "react-router-dom"
import ReadyRobot from './components/ReadyRobot';
import { IGameData } from './components/game.interface';
import ReadyFriend from './components/ReadyFriend';
import Goals  from './components/Goals'
import { Socket , io } from 'socket.io-client';
import KeepTrack from './components/KeepTrack';
import { ProfileWallet } from 'components/profilePage/ProfileBanner/ProfileBanner.style';
import Result from './components/Result';

let gameCapsule: GameContainer = new GameContainer();
let playerOne : UserInfo = new UserInfo(tabId, "", 0, 0, "", "", "", 0, 0, 0, 0, 0, 0, 0);
let playerTwo : UserInfo | undefined = new UserInfo(tabId, "", 0, 0, "", "", "", 0, 0, 0, 0, 0, 0, 0);
let robot     : UserInfo = new UserInfo(tabId, "", playerOne.matchWager, playerOne.modePlaying, "Mr Robot <|o_o|>", "/images/robot.jpg", "/images/badge-3.png", 10, 10 ,10, 12, 10, 0, 0)
let gameResult : Result  = new Result(0, 0, 0, 0, 0, 0, 0, 0);

const serverUrl: string = 'ws://localhost:4055';
function ParentComponent ({ playerOne : renamePlayerOne, playerTwo : renamePlayerTwo } : 
    { playerOne : UserInfo , playerTwo : UserInfo | undefined, gameResult : Result})
{
 
    let [localGameResult, setGameResult] = useState<Result>(() => new Result(0,0,0,0,0,0,0,0));
    // let [gameResult, setGameResult] = useState(
    // {
    //     plyOneId           : renameGameResult.plyOneId,
    //     plyTwoId           : renameGameResult.plyTwoId,
    //     plyOneGoals        : renameGameResult.plyOneGoals,
    //     plyTwoGoals        : renameGameResult.plyTwoGoals,
    //     leftPlayerRebound  : renameGameResult.leftPlayerRebound,
    //     leftPlayerStrict   : renameGameResult.leftPlayerStrict,
    //     rightPlayerRebound : renameGameResult.rightPlayerRebound,
    //     rightPlayerStrict  : renameGameResult.rightPlayerStrict
    // })

    const updateGameResult = (
      newPlyOneId: number,
      newPlyTwoId: number,
      newPlyOneGoals: number,
      newPlyTwoGoals: number,
      newLeftPlayerRebound: number,
      newLeftPlayerStrict: number,
      newRightPlayerRebound: number,
      newRightPlayerStrict: number
    ) => {
        const updatedGameResult = {
            plyOneId: newPlyOneId,
            plyTwoId: newPlyTwoId,
            plyOneGoals: newPlyOneGoals,
            plyTwoGoals: newPlyTwoGoals,
            leftPlayerRebound: newLeftPlayerRebound,
            leftPlayerStrict: newLeftPlayerStrict,
            rightPlayerRebound: newRightPlayerRebound,
            rightPlayerStrict: newRightPlayerStrict
          };
      setGameResult(updatedGameResult);
        gameResult = updatedGameResult;
    };


    let [playerTwo, setPlayerTwoState] = useState(
        {
            socket         : renamePlayerTwo?.socket,
            playWithRobot  : renamePlayerTwo?.playWithRobot,
            tabId          : renamePlayerTwo?.tabId, 
            matchId        : renamePlayerTwo?.matchId,
            matchWager     : renamePlayerTwo?.matchWager,
            modePlaying    : renamePlayerTwo?.modePlaying,
            userName       : renamePlayerTwo?.userName,
            userAvatar     : renamePlayerTwo?.userAvatar,
            userLogo       : renamePlayerTwo?.userLogo,
            matchWon       : renamePlayerTwo?.matchWon,
            bestWinStreak  : renamePlayerTwo?.bestWinStreak,
            matchPlyed     : renamePlayerTwo?.matchPlyed,
            level          : renamePlayerTwo?.level,
            tournentPlayed : renamePlayerTwo?.tournentPlayed,
            tournentWon    : renamePlayerTwo?.tournentWon,
            playWithMouse  : renamePlayerTwo?.playWithMouse,
            userId         : renamePlayerTwo?.userId,
            friend         : renamePlayerTwo?.friend,
            ply2userId     : renamePlayerTwo?.ply2userId,
            matchType      : renamePlayerTwo?.matchType,
            wallet         : renamePlayerTwo?.wallet
        }
    );

    const updatePlayerTwo = (newPlayWithRobot : boolean, newTabId : string, newMatchId : string, newMatchWager: number,
        newModePlaying: number, newUserName : string, newUserAvatar: string, newUserLogo : string, newMatchWon : number,
        newBestWinStreak : number , newMatchPlayed : number, newLevel: number, newTournentPlayed : number,
        newTournentWon : number, newPlayWithMouse : number , newUserId : number,
        isFriend : boolean, newPly2userId : number, newMatchType) => 
    {
        setPlayerTwoState({...playerTwo, playWithRobot : newPlayWithRobot, 
            tabId : newTabId, matchId : newMatchId, matchWager: newMatchWager,
             modePlaying : newModePlaying, userName : newUserName, 
             userAvatar: newUserAvatar, userLogo : newUserLogo, 
             matchWon : newMatchWon, bestWinStreak : newBestWinStreak,
             matchPlyed : newMatchPlayed, level : newLevel, 
             tournentPlayed : newTournentPlayed, tournentWon : newTournentWon,
             playWithMouse : newPlayWithMouse, userId : newUserId, friend : isFriend,
             ply2userId : newPly2userId, matchType : newMatchType});
    };



    let [playerOne , SetUserInfoData] = useState({
        socket         : renamePlayerOne.socket,
        playWithRobot  : renamePlayerOne.playWithRobot,
        tabId          : renamePlayerOne.tabId, 
        matchId        : renamePlayerOne.matchId,
        matchWager     : renamePlayerOne.matchWager,
        modePlaying    : renamePlayerOne.modePlaying,
        userName       : renamePlayerOne.userName,
        userAvatar     : renamePlayerOne.userAvatar,
        userLogo       : renamePlayerOne.userLogo,
        matchWon       : renamePlayerOne.matchWon,
        bestWinStreak  : renamePlayerOne.bestWinStreak,
        matchPlyed     : renamePlayerOne.matchPlyed,
        level          : renamePlayerOne.level,
        tournentPlayed : renamePlayerOne.tournentPlayed,
        tournentWon    : renamePlayerOne.tournentWon,
        playWithMouse  : renamePlayerOne.playWithMouse,
        userId         : renamePlayerOne.userId,
        friend         : renamePlayerOne.friend,
        ply2userId     : renamePlayerOne.ply2userId,
        matchType      : renamePlayerOne.matchType,
        wallet         : renamePlayerOne.wallet
    })

    const updatePlayerOne = (newPlayWithRobot : boolean, newTabId : string, newMatchId : string, newMatchWager: number,
        newModePlaying: number, newUserName : string, newUserAvatar: string, newUserLogo : string, newMatchWon : number,
        newBestWinStreak : number , newMatchPlayed : number, newLevel: number, newTournentPlayed : number,
        newTournentWon : number, newPlayWithMouse : number , newUserId : number, isFriend : boolean, newPly2userId : number, newMatchType) => 
    {
        SetUserInfoData({...playerOne, playWithRobot : newPlayWithRobot, 
            tabId : newTabId, matchId : newMatchId, matchWager: newMatchWager,
             modePlaying : newModePlaying, userName : newUserName, 
             userAvatar: newUserAvatar, userLogo : newUserLogo, 
             matchWon : newMatchWon, bestWinStreak : newBestWinStreak,
             matchPlyed : newMatchPlayed, level : newLevel, 
             tournentPlayed : newTournentPlayed, tournentWon : newTournentWon,
             playWithMouse : newPlayWithMouse, userId : newUserId, friend : isFriend, ply2userId : newPly2userId, matchType : newMatchType});
    };
    const [readyState, setReadyState] = useState(true);
    
    let [matchState, setMatchState] = useState<boolean | undefined>(undefined);

    let updateMatchState = (newState : boolean) =>
    {
        setMatchState(newState);
    }

    let updateUserInfoWagerAndModeTwo = (newWager : number, newMode : number) =>
    {
        setPlayerTwoState({...playerTwo, matchWager : newWager, modePlaying : newMode});
    }

    let updateUserInfoWagerAndMode = (newWager : number, newMode : number) =>
    {
        SetUserInfoData( {...playerOne, matchWager : newWager, modePlaying : newMode});
    }
    
    let UpdateUserInfoUtil = (newUtil : number) =>
    {
        SetUserInfoData( { ...playerOne, playWithMouse : newUtil});
    }

    let updateUserInfoMode =  (newMode : number ) =>
    {
        SetUserInfoData({ ...playerOne, modePlaying : newMode   })
    }
    
    let updateuserinfoWager =  (newWager : number ) =>
    {
        SetUserInfoData({ ...playerOne, matchWager : newWager   })
    }

    let updateRobotOpetion = (newOpetion : boolean) =>
    {
        SetUserInfoData({ ...playerOne, playWithRobot : newOpetion})
    }
    let updateMatchId = (newMatchId : string) =>
    {
        SetUserInfoData({ ...playerOne, matchId : newMatchId})
    } 

    let updateReadyState = (newState : boolean) =>
    {
        setReadyState(newState);
    }
    let [isServerDown, setServerState]  = useState(false);

    let updateServerState = (newState : boolean) =>
    {
        setServerState(newState);
    }

    


    if (playerOne.playWithMouse === 0)
        return (< Util playerOne={playerOne} playerTwo={playerTwo as UserInfo} updatePlayerOne={updatePlayerOne} updatePlayerTwo={updatePlayerTwo} updateUserInfoUtil={UpdateUserInfoUtil}/>);
    else if (playerOne.modePlaying === 0)
        return ( <Modes playerOne={playerOne} updateUserInfoMode={updateUserInfoMode}/>);
    else if (playerOne.matchWager === 0)
        return ( < Deposit playerOne={playerOne} updateUserInfoWager={updateuserinfoWager}/>);
    else if (playerOne.matchId.length === 0 && playerOne.playWithRobot === false)
        return (
        <>
        <Waiting playerOne={ playerOne } playerTwo={ playerTwo as UserInfo }
                updateRobotOpetion={updateRobotOpetion} updateMatchId={updateMatchId} updatePlayerTwo={updatePlayerTwo} updateUserInfoWager={updateuserinfoWager} />
        </>
        )
    if (playerOne.matchId.length > 0 && playerOne.playWithRobot === false && readyState && playerOne.friend === false)
        return (< Ready playerOne={playerOne} playerTwo={playerTwo as UserInfo} updateReadyState={updateReadyState} updatePlayerTwo={updatePlayerTwo}/>)
    else if (playerOne.matchId.length > 0 && playerOne.playWithRobot === false && readyState && playerOne.friend)
                return (< ReadyFriend playerOne={playerOne} playerTwo={playerTwo as UserInfo} updateReadyState={updateReadyState} updatePlayerTwo={updatePlayerTwo}/>)
    else if (playerOne.playWithRobot === true && readyState )
    {
        return (< ReadyRobot playerOne={playerOne} playerTwo={playerTwo as UserInfo} robot={robot} updateReadyState={updateReadyState} updateUserInfoWagerAndMode={updateUserInfoWagerAndMode}  
            updateUserInfoWagerAndModeTwo={updateUserInfoWagerAndModeTwo} updateMatchId={updateMatchId} updatePlayerTwo={updatePlayerTwo} />)
    }
    else if (matchState === undefined)
    {
        if (isServerDown === true)
            return ( <ServerDown/>);
        else
            return (
                <>
                    <div id="gameHover">

                    <Info playerOne={playerOne} playerTwo={playerTwo as UserInfo} localGameResult={localGameResult} updateMatchState={updateMatchState}
                        updateGameResult={updateGameResult} matchState={matchState}/>
                    <App  gameCapsule={gameCapsule} playerOne={playerOne} playerTwo={playerTwo as UserInfo}
                        updateMatchState={updateMatchState} updateServerState={updateServerState} matchState={matchState}/>
                    </div>
                </>
            )
    }
    else if (matchState === true)
        return (< Congratulation playerOne={playerOne} playerTwo={playerTwo as UserInfo} localGameResult={localGameResult}/>)
    else if (matchState === false)
        return (< BetterLuck playerOne={playerOne} playerTwo={playerTwo as UserInfo} />)
    return (null)
}
  
export default ParentComponent;

export { gameCapsule };

export { playerOne, playerTwo , gameResult}