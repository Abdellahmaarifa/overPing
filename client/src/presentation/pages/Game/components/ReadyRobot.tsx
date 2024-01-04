import './Ready.css'
import UserInfo from './UserInfo';
import { useEffect } from 'react';

interface readyProps
{
    playerOne : UserInfo;
    playerTwo : UserInfo;
    robot     : UserInfo;
    updateReadyState : (val : boolean ) => void;
    updateUserInfoWagerAndMode : (val1 : number, val2 : number) => void;
    updateUserInfoWagerAndModeTwo : (val1 : number, val2 : number) => void;
    updateMatchId : (val : string) => void;
    updatePlayerTwo : (newPlayWithRobot : boolean, newTabId : string, newMatchId : string, newMatchWager: number,
        newModePlaying: number, newUserName : string, newUserAvatar: string, newUserLogo : string, newMatchWon : number,
        newBestWinStreak : number , newMatchPlayed : number, newLevel: number, newTournentPlayed : number,
        newTournentWon : number, newPlayWithMouse : number , usrid: number) => void;
}


let ReadyRobot = ( {playerOne, playerTwo, robot, updateReadyState , updateUserInfoWagerAndMode, updateUserInfoWagerAndModeTwo , updateMatchId , updatePlayerTwo} : readyProps) =>
{
    let plyOneImg : HTMLElement | null = null;
    let plyTwoImg : HTMLElement | null = null;
    let modePlay : number = 0;
    let wagerPlay : number = 0;

    //get mode
    
    useEffect(() =>{
        if (playerOne.matchWager > playerTwo.matchWager)
        {
            modePlay = playerOne.modePlaying;
        }
        else if (playerTwo.matchWager > playerOne.matchWager)
        {
            modePlay = playerTwo.modePlaying;
        }
        else if (playerOne.matchWager === playerTwo.matchWager)
        {
            if (playerOne.modePlaying > playerTwo.modePlaying)
                modePlay = playerOne.modePlaying;
            else
                modePlay = playerTwo.modePlaying;
        }
        //get wager
        if (playerOne.matchWager < playerTwo.matchWager)
            wagerPlay = playerOne.matchWager;
        else 
            wagerPlay = playerTwo.matchWager;
    
        updateUserInfoWagerAndModeTwo(wagerPlay, modePlay)
        updateUserInfoWagerAndMode(wagerPlay, modePlay)
        updatePlayerTwo(robot.playWithRobot, robot.tabId, robot.matchId, 
        robot.matchWager, robot.modePlaying, robot.userName, robot.userAvatar,
        robot.userLogo , robot.matchWon, robot.bestWinStreak, robot.matchPlyed,
        robot.level, robot.tournentPlayed, robot.tournentWon, robot.playWithMouse, robot.userId);
        
        if (playerOne.playWithRobot)
             updateMatchId('robot' + (Math.floor(Math.random() * 10000) + 1).toString() + Date.now().toString())

    }, [])

    setTimeout( () => {
        
        plyOneImg  = document.getElementById("ReadyAvatar2");
        plyTwoImg  = document.getElementById("ReadyAvatar1");
        plyOneImg?.setAttribute('src', playerOne.userAvatar);
        plyTwoImg?.setAttribute('src', playerTwo.userAvatar);
        // else

    }, 200)

    setTimeout( () => {
        updateReadyState(false);
    }, 5000);

    // console.log("players : ", playerOne,"\n==============\n", playerTwo);

    return (
        <div className='ReadyContainer'>
            <div className='ReadyState'>
                <p>Ready!</p>
            </div>
            <div className="ReadyVs">
                <div className="ReadyFlashLight"><p>VS</p></div>
                {/* <p>VS</p> */}
            </div>
            <div className='ReadyCoins'>
                <p>{playerOne.matchWager + playerTwo.matchWager} &#128176;</p>
            </div>
            <div className='ReadyPlayer1'>
                <div className='ReadyPlyInside1'>
                    <div className="ReadyAvatarR1Cover">
                        <div className="ReadyAvatarR1"><img id="ReadyAvatar1" src="question-mark.jpeg" alt="avatar"/></div>
                    </div>
                    <div className='ReadyPlayerName1'>
                        <p>{playerTwo.userName}</p>
                    </div>
                    <div className='ReadyDiposit1'>
                        <p className='ReadyNbr1'>{playerTwo.matchWager} &#128176;</p>
                    </div>
                </div>
            </div>
            <div className='ReadyPlayer2'>
                <div className='ReadyPlyInside2'>
                    <div className="ReadyAvatarR2Cover">
                        <div className="ReadyAvatarR2"><img id="ReadyAvatar2" src="question-mark.jpeg" alt="avatar"/></div>
                    </div>
                    <div className='ReadyPlayerName2'>
                        <p>{playerOne.userName}</p>
                    </div>
                    <div className='ReadyDiposit2'>
                        <p className='ReadyNbr2'>{playerOne.matchWager} &#128176;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadyRobot;