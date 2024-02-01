import "./BetterLuck.css";
import UserInfo from "./UserInfo";

interface BetterProps {
  playerOne: UserInfo;
  playerTwo: UserInfo;
}

let BetterLuck = ({ playerOne, playerTwo }: BetterProps) => {
  let plyOneImg: HTMLElement | null = null;
  let plyTwoImg: HTMLElement | null = null;

  setTimeout(() => {
    plyOneImg = document.getElementById("betterAvatar2");
    plyTwoImg = document.getElementById("betterAvatar1");
    plyOneImg?.setAttribute("src", playerOne.userAvatar);
    plyTwoImg?.setAttribute("src", playerTwo.userAvatar);
  }, 200);

  let wager: number = playerTwo.matchWager * 2;
  return (
    <div className="betterContainer">
      <div className="betterState">
        <p>Better luck next time!</p>
      </div>
      <div className="betterVs">
        <div className="betterFlashLight">
          <p>VS</p>
        </div>
      </div>

      <div className="betterCoins">{/* <p>1000 &#128176;</p> */}</div>
      <div className="betterPlayer1">
        <div className="betterPlyInside1">
          <p className="betterWinLose">Winner</p>
          <div className="betterAvatarR1Cover">
            <div className="betterAvatarR1">
              <img id="betterAvatar1" src="question-mark.jpeg" alt="avatar" />
            </div>
          </div>
          <div className="betterPlayerName1">
            <p>{playerTwo.userName}</p>
          </div>
          <div className="betterDiposit1">
            <p className="nbr1">{wager} &#128176;</p>
          </div>
        </div>
      </div>
      <div className="betterPlayer2">
        <div className="betterPlyInside2">
          <p className="betterWinLose"> </p>

          <div className="betterAvatarR2Cover">
            <div className="betterAvatarR2">
              <img id="betterAvatar2" src="question-mark.jpeg" alt="avatar" />
            </div>
          </div>
          <div className="betterPlayerName2">
            <p>{playerOne.userName}</p>
          </div>
          <div className="betterDiposit2">
            <p className="nbr2">0 &#128176;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BetterLuck;
