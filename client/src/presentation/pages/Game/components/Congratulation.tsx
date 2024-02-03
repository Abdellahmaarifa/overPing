import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { Achieve, MatchMode } from "./Achieve";
import "./Congratulation.css";
import { IGameData } from "./game.interface";
import { lastGoalsResult } from "./Info";
import Result from "./Result";
import UserInfo from "./UserInfo";
import { XpService } from "./xp";
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
  let xp = new XpService();

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
    socket.on("error", (error) => {
      //console.log("")
    });
    socket.on("connect_timeout", (timeout) => {
      // console.error('Connection to the WebSocket server timed out:', timeout);
    });
  };

  useEffect(() => {
    setUpSocket();

    return () => {
      if (socket && socket.connected) {
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

    let p1status: number = 1;
    let p2status: number = 0;
    console.log("The fuking result is : ", lastGoalsResult);
    if (
      lastGoalsResult.rightPlayerGoals !== 5 &&
      lastGoalsResult.leftPlayerGoals !== 5
    ) {
      lastGoalsResult.leftPlayerGoals = 5;
      lastGoalsResult.rightPlayerGoals = 0;
    }
    if (lastGoalsResult.leftPlayerGoals > lastGoalsResult.rightPlayerGoals) {
      //console.log("players : ", goal.rightPlayerGoals, goal.leftPlayerGoals, p1status, p2status)
      let plyLevel: number = xp.calculateXp(
        playerOne.matchWager * 2,
        MatchMode.ONLINE_RANDOM
      );
      if (playerOne.matchType === MatchMode.VS_COMPUTER)
        plyLevel = xp.calculateXp(10, MatchMode.VS_COMPUTER);
      if (playerOne.matchType === MatchMode.VS_FRIENDS)
        plyLevel = xp.calculateXp(10, MatchMode.VS_FRIENDS);

      const gameData: IGameData = {
        playerOneId: playerOne.userId,
        playerOneName: playerOne.userName,
        playerOneImageURL: playerOne.userAvatar,
        playerOneScore: lastGoalsResult.leftPlayerGoals,
        playerOneStatus: p1status,
        playerTwoId: playerTwo.userId,
        playerTwoName: playerTwo.userName,
        playerTwoImageURL: playerTwo.userAvatar,
        playerTwoScore: lastGoalsResult.rightPlayerGoals,
        playerTwoStatus: p2status,
        points: playerOne.matchWager * 2,
        level: plyLevel,
      };
      if (playerOne.playWithRobot === false)
        socket?.emit("customResult", gameData);
      console.log("player ", playerOne.playWithRobot, gameData);
    }
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
