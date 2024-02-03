import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Achieve, MatchMode } from "./Achieve";
import "./Congratulation.css";
import Result from "./Result";
import UserInfo from "./UserInfo";

const serverUrl: string = import.meta.env.OVER_PING_SERVER_URL_PROD_WS;

interface CongraProps {
  playerOne: UserInfo;
  playerTwo: UserInfo;
  localGameResult: Result;
}

let Congratulation = ({
  playerOne,
  playerTwo,
  localGameResult,
}: CongraProps) => {
  let plyOneImg: HTMLElement | null = null;
  let plyTwoImg: HTMLElement | null = null;
  let socket: Socket | null = null;

  setTimeout(() => {
    plyOneImg = document.getElementById("congAvatar2");
    plyTwoImg = document.getElementById("congAvatar1");
    plyOneImg?.setAttribute("src", playerOne.userAvatar);
    plyTwoImg?.setAttribute("src", playerTwo.userAvatar);
    // else
  }, 200);

  let plyOneGoals: number = 0;
  let plyTwoGoals: number = 0;
  if ((playerOne.userId = localGameResult.plyOneId)) {
    plyOneGoals = localGameResult.plyOneGoals;
    plyTwoGoals = localGameResult.plyTwoGoals;
  } else {
    plyTwoGoals = localGameResult.plyOneGoals;
    plyOneGoals = localGameResult.plyTwoGoals;
  }

  const setUpSocket = () => {
    socket = io(serverUrl, {
      path: "/game-container",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      //console.log(`quit Connected to WebSocket server`);
    });

    socket.on("disconnect", () => {
      //console.log(`quit Disconnected from WebSocket server`);
    });

    socket.on("connect_error", (error) => {
      //console.error('Error connecting to the WebSocket server:');
    });
  };

  useEffect(() => {
    setUpSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    let mode: MatchMode;

    if (
      playerOne.matchType === "online-random-match" &&
      playerOne.playWithRobot === false
    )
      mode = MatchMode.ONLINE_RANDOM;
    else if (
      playerOne.matchType === "match-against-computer" ||
      playerOne.playWithRobot
    )
      mode = MatchMode.VS_COMPUTER;
    else mode = MatchMode.VS_FRIENDS;

    let player1: Achieve;
    let player2: Achieve;
    player1 = {
      user_id: playerOne.userId,
      score_for: localGameResult.plyOneGoals,
      score_against: localGameResult.plyTwoGoals,
      is_winner: true,
      bet: playerOne.matchWager * 2,
      matchMode: mode,
      strict_shot_goals: localGameResult.leftPlayerStrict,
      rebounded_goals: localGameResult.leftPlayerRebound,
      starts_collected: 0,
    };

    player2 = {
      user_id: playerTwo.userId,
      score_for: localGameResult.plyTwoGoals,
      score_against: localGameResult.plyOneGoals,
      is_winner: false,
      bet: playerOne.matchWager * 2,
      matchMode: mode,
      strict_shot_goals: localGameResult.rightPlayerStrict,
      rebounded_goals: localGameResult.rightPlayerRebound,
      starts_collected: 0,
    };
    socket?.emit("customAchieve", { player1, player2 });
    //console.log("The game result is : ", gameResult)
    //console.log("player One : ", player1);
    //console.log("player One : ", player2);
  }, []);

  let wager: number = playerOne.matchWager * 2;
  return (
    <div className="congcontainer">
      <div className="congState">
        <p>Congratulation!</p>
      </div>
      <div className="congvs">
        <div className="congFlashLight">
          <p>VS</p>
        </div>
        {/* <p>VS</p> */}
      </div>
      <div className="congcoins">{/* <p>1000 &#128176;</p> */}</div>
      <div className="congPlayer1">
        <div className="congPlyInside1">
          <p className="winLose"> </p>
          <div className="congAvatarR1Cover">
            <div className="congAvatarR1">
              <img id="congAvatar1" src="question-mark.jpeg" alt="avatar" />
            </div>
          </div>
          <div className="congPlayerName1">
            <p>{playerTwo.userName}</p>
          </div>
          <div className="congDiposit1">
            <p className="nbr1">0 &#128176;</p>
          </div>
        </div>
      </div>
      <div className="congPlayer2">
        <div className="congPlyInside2">
          <p className="winLose">Winner</p>
          <div className="congAvatarR2Cover">
            <div className="congAvatarR2">
              <img id="congAvatar2" src="question-mark.jpeg" alt="avatar" />
            </div>
          </div>
          <div className="congPlayerName2">
            <p>{playerOne.userName}</p>
          </div>
          <div className="congDiposit2">
            <p className="nbr2">{wager} &#128176;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulation;
