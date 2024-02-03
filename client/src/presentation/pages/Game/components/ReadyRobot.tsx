import { useEffect } from "react";
import { MatchMode } from "./Achieve";
import "./Ready.css";
import UserInfo from "./UserInfo";

interface readyProps {
  playerOne: UserInfo;
  playerTwo: UserInfo;
  robot: UserInfo;
  updateReadyState: (val: boolean) => void;
  updateUserInfoWagerAndMode: (val1: number, val2: number) => void;
  updateuserinfoWager: (val: number) => void;
  updateMatchId: (val: string) => void;
  updatePlayerTwo: (
    newPlayWithRobot: boolean,
    newTabId: string,
    newMatchId: string,
    newMatchWager: number,
    newModePlaying: number,
    newUserName: string,
    newUserAvatar: string,
    newUserLogo: string,
    newMatchWon: number,
    newBestWinStreak: number,
    newMatchPlayed: number,
    newLevel: number,
    newTournentPlayed: number,
    newTournentWon: number,
    newPlayWithMouse: number,
    usrid: number,
    friend: boolean,
    newPly1userId: number,
    matchType
  ) => void;
  updatePlayerOne: (
    newPlayWithRobot: boolean,
    newTabId: string,
    newMatchId: string,
    newMatchWager: number,
    newModePlaying: number,
    newUserName: string,
    newUserAvatar: string,
    newUserLogo: string,
    newMatchWon: number,
    newBestWinStreak: number,
    newMatchPlayed: number,
    newLevel: number,
    newTournentPlayed: number,
    newTournentWon: number,
    newPlayWithMouse: number,
    usrid: number,
    friend: boolean,
    ply2userId: number,
    matchType: string
  ) => void;
}

let ReadyRobot = ({
  playerOne,
  playerTwo,
  robot,
  updateReadyState,
  updateUserInfoWagerAndMode,
  updateuserinfoWager,
  updateMatchId,
  updatePlayerTwo,
  updatePlayerOne,
}: readyProps) => {
  let plyOneImg: HTMLElement | null = null;
  let plyTwoImg: HTMLElement | null = null;
  let modePlay: number = 0;
  let wagerPlay: number = 0;

  useEffect(() => {
    modePlay = 1;
    //updateuserinfoWager(0);
    //updateUserInfoWagerAndMode(0, modePlay);
    if (playerOne.matchWager !== 0) {
      updatePlayerOne(
        playerOne.playWithRobot,
        playerOne.tabId,
        playerOne.matchId,
        0,
        modePlay,
        playerOne.userName,
        playerOne.userAvatar,
        playerOne.userLogo,
        playerOne.matchWon,
        playerOne.bestWinStreak,
        playerOne.matchPlyed,
        playerOne.level,
        playerOne.tournentPlayed,
        playerOne.tournentWon,
        playerOne.playWithMouse,
        playerOne.userId,
        playerOne.friend,
        playerOne.ply2userId,
        MatchMode.VS_COMPUTER
      );
    }
    updatePlayerTwo(
      robot.playWithRobot,
      robot.tabId,
      robot.matchId,
      0,
      modePlay,
      robot.userName,
      robot.userAvatar,
      robot.userLogo,
      robot.matchWon,
      robot.bestWinStreak,
      robot.matchPlyed,
      robot.level,
      robot.tournentPlayed,
      robot.tournentWon,
      robot.playWithMouse,
      robot.userId,
      false,
      0,
      MatchMode.VS_COMPUTER
    );

    if (playerOne.playWithRobot)
      updateMatchId(
        "robot" +
          (Math.floor(Math.random() * 10000) + 1).toString() +
          Date.now().toString()
      );
  }, []);

  setTimeout(() => {
    plyOneImg = document.getElementById("ReadyAvatar2");
    plyTwoImg = document.getElementById("ReadyAvatar1");
    plyOneImg?.setAttribute("src", playerOne.userAvatar);
    plyTwoImg?.setAttribute("src", playerTwo.userAvatar);
    // else
  }, 200);

  setTimeout(() => {
    updateReadyState(false);
  }, 4000);

  return (
    <div className="ReadyContainer">
      <div className="ReadyState">
        <p>Ready robot!</p>
      </div>
      <div className="ReadyVs">
        <div className="ReadyFlashLight">
          <p>VS</p>
        </div>
        {/* <p>VS</p> */}
      </div>
      <div className="ReadyCoins">
        <p>0 &#128176;</p>
      </div>
      <div className="ReadyPlayer1">
        <div className="ReadyPlyInside1">
          <div className="ReadyAvatarR1Cover">
            <div className="ReadyAvatarR1">
              <img id="ReadyAvatar1" src="question-mark.jpeg" alt="avatar" />
            </div>
          </div>
          <div className="ReadyPlayerName1">
            <p>{playerTwo.userName}</p>
          </div>
          <div className="ReadyDiposit1">
            <p className="ReadyNbr1">0 &#128176;</p>
          </div>
        </div>
      </div>
      <div className="ReadyPlayer2">
        <div className="ReadyPlyInside2">
          <div className="ReadyAvatarR2Cover">
            <div className="ReadyAvatarR2">
              <img id="ReadyAvatar2" src="question-mark.jpeg" alt="avatar" />
            </div>
          </div>
          <div className="ReadyPlayerName2">
            <p>{playerOne.userName}</p>
          </div>
          <div className="ReadyDiposit2">
            <p className="ReadyNbr2">0 &#128176;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadyRobot;
