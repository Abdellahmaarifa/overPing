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

let gameCapsule: GameContainer = new GameContainer();

let playerOne : UserInfo = new UserInfo(tabId, "", 0, 0, "hunter X111", "/images/kilua.jpg", "", 0, 0, 0, 0, 0, 0);
let playerTwo : UserInfo | undefined = new UserInfo(tabId, "", 0, 0, "machi +", "/images/machi.jpg", "", 0, 0, 0, 0, 0, 0);
let robot     : UserInfo = new UserInfo(tabId, "", playerOne.matchWager, playerOne.modePlaying, "Mr Robot <|o_o|>", "/images/robot.jpg", "", 0, 0 ,0, 12, 0, 0)



function ParentComponent ({ playerOne : renamePlayerOne, playerTwo : renamePlayerTwo} : { playerOne : UserInfo , playerTwo : UserInfo | undefined })
{
    
    //let { user } =  useUserContext();

   /* const FIND_PROFILE_BY_USER_ID = gql`
        query findProfileByUserId($userId: Float!) {
        findProfileByUserId(userId: $userId) {
            id
            user_id
            nickname
            title
            xp
            rank
            about
        }
    }
    `;*/
    //console.log(user);

   /* const { loading, error, data } = useQuery(FIND_PROFILE_BY_USER_ID, {
        variables: { user.id },
      });
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    
    const userProfile = data.findProfileByUserId;
      */
    let isMobileSet: boolean = false;

    function isMobileOrTablet() : boolean 
    {
        const userAgent = navigator.userAgent.toLowerCase();
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    }

    function isLandscape(): boolean 
    {
        const aspectRatio = window.innerWidth / window.innerHeight;
        const isLandscape = aspectRatio > 1; // Landscape if aspect ratio is greater than 1
    
        return isLandscape;
    }

    useEffect(() => 
    {
        const intervalId = setInterval(() => 
        {
          if (isMobileOrTablet() && isMobileSet === false) 
          {
            console.log("It's a mobile");
            document.body.classList.add('bodyMobileClass');

            isMobileSet = true;
          }
          else if (isMobileOrTablet() === false && isMobileSet === true) 
          {
            console.log('It is not a mobile');

            document.body.classList.remove('bodyMobileClass');
            isMobileSet = false;
          }

          
        }, 1000);
    
        return () => {
          clearInterval(intervalId); // Clear the interval when the component is unmounted
        };
    }, []);

    let [matchState, setMatchState] = useState<boolean | undefined>(undefined);

    let updateMatchState = (newState : boolean) =>
    {
        setMatchState(newState);
    }

    // let readyState : boolean = true;
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
            playWithMouse  : renamePlayerTwo?.playWithMouse 
        }
    );

    const updatePlayerTwo = (newPlayWithRobot : boolean, newTabId : string, newMatchId : string, newMatchWager: number,
        newModePlaying: number, newUserName : string, newUserAvatar: string, newUserLogo : string, newMatchWon : number,
        newBestWinStreak : number , newMatchPlayed : number, newLevel: number, newTournentPlayed : number,
        newTournentWon : number, newPlayWithMouse : number ) => 
    {
        // console.log("in the update state  : ", playerTwo)    
        setPlayerTwoState({...playerTwo, playWithRobot : newPlayWithRobot, 
            tabId : newTabId, matchId : newMatchId, matchWager: newMatchWager,
             modePlaying : newModePlaying, userName : newUserName, 
             userAvatar: newUserAvatar, userLogo : newUserLogo, 
             matchWon : newMatchWon, bestWinStreak : newBestWinStreak,
             matchPlyed : newMatchPlayed, level : newLevel, 
             tournentPlayed : newTournentPlayed, tournentWon : newTournentWon,
             playWithMouse : newPlayWithMouse});
        // console.log("update called : ", playerTwo);
    };

    let updateUserInfoWagerAndModeTwo = (newWager : number, newMode : number) =>
    {
        setPlayerTwoState({...playerTwo, matchWager : newWager, modePlaying : newMode});
    }

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
        playWithMouse  : renamePlayerOne.playWithMouse
    })

    const [readyState, setReadyState] = useState(true);
    
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

    if (playerOne.playWithRobot === true)
    {
        robot.matchWager = playerOne.matchWager;
        robot.modePlaying = playerOne.modePlaying;
        
    }
    // return (
    //     <>
    //         <Info  playerOne={playerOne} playerTwo={playerTwo as UserInfo} updateMatchState={updateMatchState}/>
    //         <App  gameCapsule={gameCapsule} playerOne={playerOne} playerTwo={playerTwo as UserInfo} updateMatchState={updateMatchState} />
    //     </>
    // )

    if (playerOne.playWithMouse === 0)
        return (< Util playerOne={playerOne} updateUserInfoUtil={UpdateUserInfoUtil}/>);
    else if (playerOne.modePlaying === 0)
        return ( <Modes playerOne={playerOne} updateUserInfoMode={updateUserInfoMode}/>);
    else if (playerOne.matchWager === 0)
        return ( < Deposit playerOne={playerOne} updateUserInfoWager={updateuserinfoWager}/>);
    else if (playerOne.matchId.length === 0 && playerOne.playWithRobot === false)
        return (<Waiting playerOne={ playerOne } playerTwo={ playerTwo as UserInfo }
             updateRobotOpetion={updateRobotOpetion} updateMatchId={updateMatchId} updatePlayerTwo={updatePlayerTwo}  />) 
    if (playerOne.matchId.length > 0 && playerOne.playWithRobot === false && readyState)
        return (< Ready playerOne={playerOne} playerTwo={playerTwo as UserInfo} updateReadyState={updateReadyState} updateUserInfoWagerAndMode={updateUserInfoWagerAndMode} updateUserInfoWagerAndModeTwo={updateUserInfoWagerAndModeTwo} updateMatchId={updateMatchId}/>)
    else if (playerOne.playWithRobot === true && readyState )
        return (< Ready playerOne={playerOne} playerTwo={robot} updateReadyState={updateReadyState} updateUserInfoWagerAndMode={updateUserInfoWagerAndMode}  updateUserInfoWagerAndModeTwo={updateUserInfoWagerAndModeTwo} updateMatchId={updateMatchId}/>)
    else if (matchState === undefined)
    {
        if (isServerDown === true)
            return ( <ServerDown/>);
        else
            return (
                <>
                    <Info  playerOne={playerOne} playerTwo={playerTwo as UserInfo} updateMatchState={updateMatchState} />
                    <App  gameCapsule={gameCapsule} playerOne={playerOne} playerTwo={playerTwo as UserInfo}
                     updateMatchState={updateMatchState} updateServerState={updateServerState}/>
                </>
            )
    }
    else if (matchState === true)
        return (< Congratulation playerOne={playerOne} playerTwo={playerTwo as UserInfo} />)
    else if (matchState === false)
        return (< BetterLuck playerOne={playerOne} playerTwo={playerTwo as UserInfo} />)
    return (null)
}
  
export default ParentComponent;

export { gameCapsule };

export { playerOne, playerTwo }