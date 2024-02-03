import "./Ready.css";
import UserInfo from "./UserInfo";
import { useEffect } from "react";
import { useAccountQuery } from "gql/index";

interface readyProps {
  playerOne: UserInfo;
  playerTwo: UserInfo;
  updateReadyState: (val: boolean) => void;
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
    ply2userId: number,
    matchType: string
  ) => void;
}

let Ready = ({
  playerOne,
  playerTwo,
  updateReadyState,
  updatePlayerTwo,
}: readyProps) => {
  let plyOneImg: HTMLElement | null = null;
  let plyTwoImg: HTMLElement | null = null;
  let modePlay: number = 0;
  let wagerPlay: number = 0;

  const { data, loading, error } = useAccountQuery({
    variables: {
      userId: playerTwo.userId,
    },
  });

  setTimeout(() => {
    plyOneImg = document.getElementById("ReadyAvatar2");
    plyTwoImg = document.getElementById("ReadyAvatar1");
    plyOneImg?.setAttribute("src", playerOne.userAvatar);
    plyTwoImg?.setAttribute("src", playerTwo.userAvatar);
    // else
  }, 200);

  //console.log("Mode playing : ", playerOne.modePlaying, playerTwo.modePlaying)

  if (loading) return <p>Loading...Ready</p>;
  else if (error) {
    //console.log("error : ", error, playerTwo.userId)
    return <p>Error...Ready</p>;
  } else {
    setTimeout(() => {
      let ply2Username: string = data?.findUserById.username as string;
      let ply2UserAvatar: string = data?.findUserById.profileImgUrl as string;
      let ply2MatchWon: number = data?.findProfileByUserId?.gameStatus
        .matchesWon as number;
      let ply2BestWinSteak: number = data?.findProfileByUserId?.gameStatus
        .best_win_streak as number;
      let ply2MatchPlyed: number = data?.findProfileByUserId?.gameStatus
        .totalMatches as number;
      let ply2Level: number = data?.findProfileByUserId?.xp as number;
      let ply2TournentPlayed: number = data?.findProfileByUserId?.gameStatus
        .matchesLoss as number;
      let ply2TournenetWon: number = data?.findProfileByUserId?.gameStatus
        .win_streak as number;
      let ply2UserLogo: string = "";
      let ply2TabId: string = playerTwo.userId.toString();
      let ply1UserId: number = playerOne.ply2userId;
      let ply1MatchType: string = playerOne.matchType;
      let ply2MatchId: string = playerTwo.matchId;
      let ply2MatchWager: number = playerOne.matchWager;
      let ply2UserId: number = playerTwo.userId;
      let ply2ModePlaying: number = playerTwo.modePlaying;
      if ((data?.findProfileByUserId?.rank as number) < 100)
        ply2UserLogo = "../../../assets/game/badge-1.png";
      if (
        (data?.findProfileByUserId?.rank as number) >= 100 &&
        (data?.findProfileByUserId?.rank as number) < 200
      )
        ply2UserLogo = "../../../assets/game/badge-2.png";
      if ((data?.findProfileByUserId?.rank as number) >= 200)
        ply2UserLogo = "../../../assets/game/badge-3.png";

      if (playerTwo.userLogo.length === 0) {
        updatePlayerTwo(
          false,
          ply2TabId,
          ply2MatchId,
          ply2MatchWager,
          ply2ModePlaying,
          ply2Username,
          ply2UserAvatar,
          ply2UserLogo,
          ply2MatchWon,
          ply2BestWinSteak,
          ply2MatchPlyed,
          ply2MatchPlyed,
          ply2BestWinSteak,
          ply2TournentPlayed,
          ply2TournenetWon,
          ply2UserId,
          false,
          ply1UserId,
          ply1MatchType
        );
      }
    }, 500);
    setTimeout(() => {
      //console.log("{playerOne :}", playerOne);
      //console.log("{playerTwo :}", playerTwo);
      updateReadyState(false);
    }, 4000);

    return (
      <div className="ReadyContainer">
        <div className="ReadyState">
          <p>Ready!</p>
        </div>
        <div className="ReadyVs">
          <div className="ReadyFlashLight">
            <p>VS</p>
          </div>
          {/* <p>VS</p> */}
        </div>
        <div className="ReadyCoins">
          <p>{playerOne.matchWager + playerTwo.matchWager} &#128176;</p>
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
              <p className="ReadyNbr1">{playerTwo.matchWager} &#128176;</p>
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
              <p className="ReadyNbr2">{playerOne.matchWager} &#128176;</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Ready;
