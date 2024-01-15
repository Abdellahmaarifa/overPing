import './Ready.css'
import UserInfo from './UserInfo';
import { useEffect } from 'react';
import { useAccountQuery} from "gql/index";

interface readyProps
{
    playerOne : UserInfo;
    playerTwo : UserInfo;
    updateReadyState : (val : boolean ) => void;
    updateUserInfoWagerAndMode : (val1 : number, val2 : number) => void;
    updateUserInfoWagerAndModeTwo : (val1 : number, val2 : number) => void;
    updateMatchId : (val : string) => void;
    updatePlayerTwo: (newPlayWithRobot: boolean, newTabId: string, newMatchId: string, newMatchWager: number,
        newModePlaying: number, newUserName: string, newUserAvatar: string, newUserLogo: string, newMatchWon: number,
        newBestWinStreak: number, newMatchPlayed: number, newLevel: number, newTournentPlayed: number,
        newTournentWon: number, newPlayWithMouse: number, usrid : number) => void;
}


let Ready = ( {playerOne, playerTwo, updateReadyState , updateUserInfoWagerAndMode, updateUserInfoWagerAndModeTwo , updateMatchId, updatePlayerTwo} : readyProps) =>
{
    let plyOneImg : HTMLElement | null = null;
    let plyTwoImg : HTMLElement | null = null;
    let modePlay : number = 0;
    let wagerPlay : number = 0;

    const { data, loading, error } = useAccountQuery({
        variables: {
          userId: playerTwo.userId,
        },
      });
    //get mode
    // useEffect(() =>{
    //     if (playerOne.matchWager > playerTwo.matchWager)
    //     {
    //         modePlay = playerOne.modePlaying;
    //     }
    //     else if (playerTwo.matchWager > playerOne.matchWager)
    //     {
    //         modePlay = playerTwo.modePlaying;
    //     }
    //     else if (playerOne.matchWager === playerTwo.matchWager)
    //     {
    //         if (playerOne.modePlaying > playerTwo.modePlaying)
    //             modePlay = playerOne.modePlaying;
    //         else
    //             modePlay = playerTwo.modePlaying;
    //     }
    //     //get wager
    //     if (playerOne.matchWager < playerTwo.matchWager)
    //         wagerPlay = playerOne.matchWager;
    //     else 
    //         wagerPlay = playerTwo.matchWager;
    
    //     updateUserInfoWagerAndModeTwo(wagerPlay, modePlay)
    //     updateUserInfoWagerAndMode(wagerPlay, modePlay)
    //     if (playerOne.playWithRobot)
    //          updateMatchId('robot' + (Math.floor(Math.random() * 10000) + 1).toString() + Date.now().toString())

    // }, [])

    setTimeout( () => {
        plyOneImg  = document.getElementById("ReadyAvatar2");
        plyTwoImg  = document.getElementById("ReadyAvatar1");
        plyOneImg?.setAttribute('src', playerOne.userAvatar);
        plyTwoImg?.setAttribute('src', playerTwo.userAvatar);
        // else

    }, 200)

   //console.log("+++++++++++++++ players 1 2 id: ",playerOne.userId, " - ", playerTwo.userId)
   //console.log("+++++++++++++++ players 1 2 id: ",playerOne, " - ", playerTwo)
  

    if (loading)
      return (<p>Loading...</p>)
    else if (error)
    {
        console.log("error : ", error)
        return (<p>Error...</p>)
    }
    else
    {
        let ply2Username : string = data?.findUserById.username as string;
        let ply2UserAvatar : string = data?.findUserById.profileImgUrl as string;
        let ply2MatchWon : number = data?.findProfileByUserId?.gameStatus.matchesWon as number;
        let ply2BestWinSteak : number = data?.findProfileByUserId?.gameStatus.best_win_streak as number;
        let ply2MatchPlyed : number = data?.findProfileByUserId?.gameStatus.totalMatches as number;
        let ply2Level : number = data?.findProfileByUserId?.xp as number;
        let ply2TournentPlayed : number = data?.findProfileByUserId?.gameStatus.matchesLoss as number;
        let ply2TournenetWon : number = data?.findProfileByUserId?.gameStatus.win_streak as number;
        let ply2UserLogo : string = "";
        let ply2TabId : string = playerTwo.userId.toString();
        if (data?.findProfileByUserId?.rank  as number < 100)
            ply2UserLogo = "/public/images/badge-1.png"
        if (data?.findProfileByUserId?.rank  as number >= 100 && data?.findProfileByUserId?.rank  as number < 200)
            ply2UserLogo = "/public/images/badge-2.png";
        if (data?.findProfileByUserId?.rank  as number >= 200)
            ply2UserLogo = "/public/images/badge-3.png";
        
        let ply2MatchId : string = playerTwo.matchId;
        let ply2MatchWager : number = playerTwo.matchWager;
        let ply2UserId : number  =  playerTwo.userId;
        let ply2ModePlaying : number = playerTwo.modePlaying;
        if (data?.findProfileByUserId?.rank  as number < 100)
            ply2UserLogo = "/public/images/badge-1.png"
        if (data?.findProfileByUserId?.rank  as number >= 100 && data?.findProfileByUserId?.rank  as number < 200)
            ply2UserLogo = "/public/images/badge-2.png";
        if (data?.findProfileByUserId?.rank  as number >= 200)
            ply2UserLogo = "/public/images/badge-3.png";
    
        if (playerTwo.userLogo.length === 0)
        {
            updatePlayerTwo(false, ply2TabId, ply2MatchId, ply2MatchWager, ply2ModePlaying, ply2Username, ply2UserAvatar,
            ply2UserLogo, ply2MatchWon, ply2BestWinSteak, ply2MatchPlyed, ply2MatchPlyed, ply2BestWinSteak,
            ply2TournentPlayed, ply2TournenetWon, ply2UserId);
        }
        setTimeout( () => {
            updateReadyState(false);
        }, 10000);
        
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
}

export default Ready;