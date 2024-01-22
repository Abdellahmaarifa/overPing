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
import { Result } from './components/Result';
let gameCapsule: GameContainer = new GameContainer();

let playerOne : UserInfo = new UserInfo(tabId, "", 0, 0, "", "", "", 0, 0, 0, 0, 0, 0, 0);
let playerTwo : UserInfo | undefined = new UserInfo(tabId, "", 0, 0, "", "", "", 0, 0, 0, 0, 0, 0, 0);
let robot     : UserInfo = new UserInfo(tabId, "", playerOne.matchWager, playerOne.modePlaying, "Mr Robot <|o_o|>", "/images/robot.jpg", "/images/badge-3.png", 10, 10 ,10, 12, 10, 0, 0)


function ParentComponent ({ playerOne : renamePlayerOne, playerTwo : renamePlayerTwo} : { playerOne : UserInfo , playerTwo : UserInfo | undefined })
{
    
    // const { user } =  useUserContext();
    // const { data, loading, error } = useAccountQuery({
    //     variables: {
    //       userId: Number(user?.id),
    //     },
    //   });
    // const [params] = useSearchParams()
    let gameResult : Result = new Result()

    let [theGameResult, setGameResult] = useState(gameResult);
    
   // console.log("params: ", params.get("type"));
    //console.log("The data ----->: ", user, "--->\n", data);



    /*useEffect(() => 
    {
    }, []);*/

    let updateGameReuslt = (gameResult : Result) =>
    {
        setGameResult(gameResult);
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
        }
    );

    const updatePlayerTwo = (newPlayWithRobot : boolean, newTabId : string, newMatchId : string, newMatchWager: number,
        newModePlaying: number, newUserName : string, newUserAvatar: string, newUserLogo : string, newMatchWon : number,
        newBestWinStreak : number , newMatchPlayed : number, newLevel: number, newTournentPlayed : number,
        newTournentWon : number, newPlayWithMouse : number , newUserId : number, isFriend : boolean) => 
    {
        setPlayerTwoState({...playerTwo, playWithRobot : newPlayWithRobot, 
            tabId : newTabId, matchId : newMatchId, matchWager: newMatchWager,
             modePlaying : newModePlaying, userName : newUserName, 
             userAvatar: newUserAvatar, userLogo : newUserLogo, 
             matchWon : newMatchWon, bestWinStreak : newBestWinStreak,
             matchPlyed : newMatchPlayed, level : newLevel, 
             tournentPlayed : newTournentPlayed, tournentWon : newTournentWon,
             playWithMouse : newPlayWithMouse, userId : newUserId, friend : isFriend});
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
    })

    const updatePlayerOne = (newPlayWithRobot : boolean, newTabId : string, newMatchId : string, newMatchWager: number,
        newModePlaying: number, newUserName : string, newUserAvatar: string, newUserLogo : string, newMatchWon : number,
        newBestWinStreak : number , newMatchPlayed : number, newLevel: number, newTournentPlayed : number,
        newTournentWon : number, newPlayWithMouse : number , newUserId : number, isFriend : boolean) => 
    {
        SetUserInfoData({...playerOne, playWithRobot : newPlayWithRobot, 
            tabId : newTabId, matchId : newMatchId, matchWager: newMatchWager,
             modePlaying : newModePlaying, userName : newUserName, 
             userAvatar: newUserAvatar, userLogo : newUserLogo, 
             matchWon : newMatchWon, bestWinStreak : newBestWinStreak,
             matchPlyed : newMatchPlayed, level : newLevel, 
             tournentPlayed : newTournentPlayed, tournentWon : newTournentWon,
             playWithMouse : newPlayWithMouse, userId : newUserId, friend : isFriend});
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

    // if (params.get("type") === "computer")
    // {
    //     playerOne.playWithRobot = true;   
    //     robot.matchWager = playerOne.matchWager;
    //     robot.modePlaying = playerOne.modePlaying;
    // }

    // if (loading) 
    //     return <h1>loading...</h1>;
    // else if (error)
    //     return <h1>Error!..</h1>
    // else
    // {
    //    playerOne.tabId = user?.id as string;
    //    playerOne.userName = user?.username as string;
    //    playerOne.userAvatar = data?.findUserById.profileImgUrl as string;
    //    playerOne.matchPlyed = data?.findProfileByUserId?.gameStatus.totalMatches as number;
    //    playerOne.matchWon = data?.findProfileByUserId?.gameStatus.matchesWon as number;
    //    playerOne.bestWinStreak = data?.findProfileByUserId?.gameStatus.best_win_streak as number;
    //    playerOne.level = data?.findProfileByUserId?.xp as number;
    //    playerOne.tournentWon = data?.findProfileByUserId?.gameStatus.win_streak as number;
    //    playerOne.tournentPlayed = data?.findProfileByUserId?.gameStatus.matchesLoss as number;
    //    playerOne.userId = Number(data?.findUserById?.id);

    //    console.log("---------------> " , playerOne.tabId, playerOne.userId);
    //     if (data?.findProfileByUserId?.rank  as number < 100)
    //         playerOne.userLogo = "/public/images/badge-1.png"
    //     if (data?.findProfileByUserId?.rank  as number >= 100 && data?.findProfileByUserId?.rank  as number < 200)
    //         playerOne.userLogo = "/public/images/badge-2.png";
    //     if (data?.findProfileByUserId?.rank  as number >= 200)
    //         playerOne.userLogo = "/public/images/badge-3.png";
    
        if (playerOne.playWithMouse === 0)
            return (< Util playerOne={playerOne} playerTwo={playerTwo as UserInfo} updatePlayerOne={updatePlayerOne} updatePlayerTwo={updatePlayerTwo} updateUserInfoUtil={UpdateUserInfoUtil}/>);
        else if (playerOne.modePlaying === 0)
            return ( <Modes playerOne={playerOne} updateUserInfoMode={updateUserInfoMode}/>);
        else if (playerOne.matchWager === 0)
            return ( < Deposit playerOne={playerOne} updateUserInfoWager={updateuserinfoWager}/>);
        else if (playerOne.matchId.length === 0 && playerOne.playWithRobot === false)
            return (<Waiting playerOne={ playerOne } playerTwo={ playerTwo as UserInfo }
                 updateRobotOpetion={updateRobotOpetion} updateMatchId={updateMatchId} updatePlayerTwo={updatePlayerTwo}  />) 
        if (playerOne.matchId.length > 0 && playerOne.playWithRobot === false && readyState)
            return (< Ready playerOne={playerOne} playerTwo={playerTwo as UserInfo} updateReadyState={updateReadyState}
                 updateUserInfoWagerAndMode={updateUserInfoWagerAndMode} updateUserInfoWagerAndModeTwo={updateUserInfoWagerAndModeTwo} updateMatchId={updateMatchId} updatePlayerTwo={updatePlayerTwo}/>)
        else if (playerOne.playWithRobot === true && readyState )
        {
            return (< ReadyRobot playerOne={playerOne} playerTwo={playerTwo as UserInfo} robot={robot} updateReadyState={updateReadyState} updateUserInfoWagerAndMode={updateUserInfoWagerAndMode}  updateUserInfoWagerAndModeTwo={updateUserInfoWagerAndModeTwo} updateMatchId={updateMatchId} updatePlayerTwo={updatePlayerTwo} />)
        }
        else if (matchState === undefined)
        {
            if (isServerDown === true)
                return ( <ServerDown/>);
            else
                return (
                    <>
                        <Info  playerOne={playerOne} playerTwo={playerTwo as UserInfo} updateMatchState={updateMatchState} updateGameResult={updateGameReuslt}/>
                        <App  gameCapsule={gameCapsule} playerOne={playerOne} playerTwo={playerTwo as UserInfo}
                         updateMatchState={updateMatchState} updateServerState={updateServerState}/>
                    </>
                )
        }
        else if (matchState === true)
            return (< Congratulation playerOne={playerOne} playerTwo={playerTwo as UserInfo} gameResult={gameResult}/>)
        else if (matchState === false)
            return (< BetterLuck playerOne={playerOne} playerTwo={playerTwo as UserInfo} />)
        return (null)
   // }
}
  
export default ParentComponent;

export { gameCapsule };

export { playerOne, playerTwo }