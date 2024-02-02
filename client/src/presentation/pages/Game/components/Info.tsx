import React, { useState, useEffect , useRef, useCallback} from "react";
import { io, Socket } from 'socket.io-client';
import './Info.css';
import Goals from "./Goals";
import UserInfo from "./UserInfo";
import Result from "./Result";
import { IGameData } from './game.interface';
import { MatchMode, XpService } from "./xp";
const serverUrl: string = 'ws://localhost:4055';
let socket: Socket | null = null;
const gameData : IGameData = new IGameData();
import { gameResult } from "../Game";
interface InfoProps
{
    playerOne : UserInfo;
    playerTwo : UserInfo;
    localGameResult : Result;
    updateMatchState : (val : boolean ) => void;
    updateGameResult : (newPlyOneId : number ,
         newPlyTwoId : number, newPlyOneGoals : number, newPlyTwoGoals : number, newLeftPlayerRebound : number,
         newLeftPlayerStrict : number, newRightPlayerRebound : number, newRightPlayerStrict : number) => void;
    matchState : boolean | undefined; 
}

let lastGoalsResult: Goals = new Goals();

function Info({playerOne, playerTwo, localGameResult, updateMatchState, updateGameResult, matchState} : InfoProps) 
{
    const [leftGoal, setLeftGoal] = useState(0);
    const [rightGoal, setRightGoal] = useState(0);
    const [playerNumber, setPlayerNumber] = useState(0);
    
    //const [ID, setUsrId] = useState("A" + playerOne.matchId);


    //console.log("Data inside it is : ", playerOne, playerTwo);
    let xp = new XpService();

    //let TempGameResult : Result | undefined = gameResult;
    const sendDataToServer = (ID : string, tabId : string) =>
    {
        if (socket)
        {
             //console.log("the id ===> ", tabId)
            socket.emit('customGoalsEvent', {ID , tabId});
        }
    };

    //continuously get goals data
    const setUpSocket = (tabId : string) =>
    {
        let ID = "ABCD1234" + playerOne.matchId;
        if (ID !== undefined) 
        {
            socket = io(serverUrl, 
            {
                path: '/game-container',
                transports: ['websocket'],
                query: { ID , tabId}
            });

            socket.on('connect', () => {
                //console.log(`info Connected to WebSocket server`);
                playerOne.socket = socket;
            });

            socket.on('disconnect', () => {

                //console.log(`info Disconnected from WebSocket server`);
            });

            socket.on('connect_error', (error) => {
                //console.error('Error connecting to the WebSocket server:');
              });

            socket.on('playerLeaveTheGame', (goal : Goals) =>
            {
                //console.log("Leaving ===>")
                if (goal && goal.leftPlayerGoals !== 5 && goal.rightPlayerGoals !== 5 && matchState === undefined)
                {
                    let plyLevel;
                    if (playerOne.matchType === MatchMode.VS_COMPUTER)
                        plyLevel = xp.calculateXp(playerOne.matchWager * 2, MatchMode.VS_COMPUTER);
                    if (playerOne.matchType === MatchMode.VS_FRIENDS)
                        plyLevel = xp.calculateXp(playerOne.matchWager * 2, MatchMode.VS_FRIENDS);
                    if (playerOne.matchType === MatchMode.ONLINE_RANDOM)
                        plyLevel = xp.calculateXp(playerOne.matchWager * 2, MatchMode.ONLINE_RANDOM);

                    const gameData : IGameData = 
                    {
                        playerOneId       : playerOne.userId,
                        playerOneName     : playerOne.userName,
                        playerOneImageURL : playerOne.userAvatar,
                        playerOneScore    : 5,
                        playerOneStatus   : 1,
                        playerTwoId       : playerTwo.userId,
                        playerTwoName     : playerTwo.userName,
                        playerTwoImageURL : playerTwo.userAvatar,
                        playerTwoScore    : 0,
                        playerTwoStatus   : 0,
                        points            : playerOne.matchWager * 2,
                        level             : plyLevel,
                    };
                    if (gameResult.plyOneId === 0 && playerOne.playWithRobot === false)
                        playerOne.socket?.emit('customResult', gameData);
                    let leftPlayerRebound = 5;
                    let leftPlayerStrict = 0;
                    let rightPlayerRebound = 0;
                    let rightPlayerStrict = 0;
                    let plyOneGoals = 5;
                    let plyTwoGoals = 0;
                    let plyOneId = playerOne.userId;
                    let plyTwoId = playerTwo.userId;
                    if (gameResult.plyOneId === 0)
                        updateGameResult(plyOneId, plyTwoId,
                                plyOneGoals, plyTwoGoals,
                                leftPlayerRebound, leftPlayerStrict,
                                rightPlayerRebound, rightPlayerStrict );
                    setTimeout(() => {
                        updateMatchState(true)
                    }, 2000)
                }
            })

            socket.on('goalsEvent', (goal : Goals) => 
            {


                if (goal.leftPlayerGoals === 5 || goal.rightPlayerGoals === 5)
                {
                    //console.log("winning ===>")
                    setTimeout(() => {
                        let p1status : number = 0;
                        let p2status : number = 0;
                        if (goal.rightPlayerGoals > goal.leftPlayerGoals)
                        {
                            p1status = 0;
                            p2status = 1;
                        }
                        else
                        {
                            p1status = 1;
                            p2status = 0;
                        }
                        //console.log("players : ", goal.rightPlayerGoals, goal.leftPlayerGoals, p1status, p2status)
                        let plyLevel;
                        if (playerOne.matchType === MatchMode.VS_COMPUTER)
                            plyLevel = xp.calculateXp(playerOne.matchWager * 2, MatchMode.VS_COMPUTER);
                        if (playerOne.matchType === MatchMode.VS_FRIENDS)
                            plyLevel = xp.calculateXp(playerOne.matchWager * 2, MatchMode.VS_FRIENDS);
                        if (playerOne.matchType === MatchMode.ONLINE_RANDOM)
                            plyLevel = xp.calculateXp(playerOne.matchWager * 2, MatchMode.ONLINE_RANDOM);
                        const gameData : IGameData = 
                        {
                            playerOneId       : playerOne.userId,
                            playerOneName     : playerOne.userName,
                            playerOneImageURL : playerOne.userAvatar,
                            playerOneScore    : goal.leftPlayerGoals,
                            playerOneStatus   : p1status,
                            playerTwoId       : playerTwo.userId,
                            playerTwoName     : playerTwo.userName,
                            playerTwoImageURL : playerTwo.userAvatar,
                            playerTwoScore    : goal.rightPlayerGoals,
                            playerTwoStatus   : p2status,
                            points            : playerOne.matchWager * 2,
                            level             : plyLevel,
                          };
                        if (gameResult.plyOneId === 0 && playerOne.playWithRobot === false)
                        {
                            playerOne.socket?.emit('customResult', gameData);
                        }
                        let leftPlayerRebound = goal.leftPlayerRebound;
                        let leftPlayerStrict = goal.leftPlayerStrict;
                        let rightPlayerRebound = goal.rightPlayerRebound;
                        let rightPlayerStrict = goal.rightPlayerStrict;
                        let plyOneGoals = goal.leftPlayerGoals;
                        let plyTwoGoals = goal.rightPlayerGoals;
                        let plyOneId = playerOne.userId;
                        let plyTwoId = playerTwo.userId;
                        if (gameResult.plyOneId === 0)
                        {
                            updateGameResult(plyOneId, plyTwoId,
                                    plyOneGoals, plyTwoGoals,
                                    leftPlayerRebound, leftPlayerStrict,
                                    rightPlayerRebound, rightPlayerStrict );
                        }
                        if (goal.rightPlayerGoals === 5 && matchState === undefined)
                        {

                            updateMatchState(false);
                        }
                        else
                        {
                            updateMatchState(true);
                        }

                    }, 3000);
                }
                if (matchState === undefined && lastGoalsResult.leftPlayerGoals !== 5 && lastGoalsResult.rightPlayerGoals !== 5)
                {
                    if (lastGoalsResult.leftPlayerGoals !== goal.leftPlayerGoals)
                    {
                        setRightGoal(goal.leftPlayerGoals);
                        lastGoalsResult.leftPlayerGoals = goal.leftPlayerGoals;
                    }
                    if (lastGoalsResult.rightPlayerGoals !== goal.rightPlayerGoals)
                    {
                        setLeftGoal(goal.rightPlayerGoals)
                        lastGoalsResult.rightPlayerGoals = goal.rightPlayerGoals;
                    }
                    if (lastGoalsResult.playerNumber === 0)
                    {
                        setPlayerNumber(goal.playerNumber);
                        lastGoalsResult.playerNumber = goal.playerNumber;
                    }
                    //setLeftGoal(goal.rightPlayerGoals);
                    //setRightGoal(goal.leftPlayerGoals);
                }
            });
        }
    }

    useEffect(() => 
    {
            setUpSocket(playerOne.tabId);
            const intervalId = setInterval(() => sendDataToServer(playerOne.matchId, playerOne.tabId), 499);
            
            return () => {
                clearInterval(intervalId)
                if (socket)
                {
                    //console.log("is disco")
                    socket.disconnect();
                }
            };
    }, []);



    const [hovered1, setHovered1] = useState(false);
    const [hovered2, setHovered2] = useState(false);

    setTimeout(() => {

        let leftImg : HTMLElement | null = document.getElementById("infoAvatar01");
        let leftImgInfo : HTMLElement | null = document.getElementById("infoAvatar1");
        let rightImg : HTMLElement | null = document.getElementById("infoAvatar02");
        let rightImgInfo : HTMLElement | null = document.getElementById("infoAvatar2");
        let leftTeam : HTMLElement | null = document.getElementById("leftTeam");
        let rightTeam : HTMLElement | null = document.getElementById("rightTeam");
        
        if (leftImg && leftImgInfo && rightImg && rightImgInfo && leftTeam && rightTeam)
        {
            leftImg.setAttribute('src', playerTwo.userAvatar);
            leftImgInfo.setAttribute('src', playerTwo.userAvatar);
            rightImg.setAttribute('src', playerOne.userAvatar );
            rightImgInfo.setAttribute('src', playerOne.userAvatar );
            leftTeam.setAttribute('src', playerTwo.userLogo);
            rightTeam.setAttribute('src', playerOne.userLogo);
        }
    }, 100)


    return (
        <div id="muteBtn" className="playersInfo">
            
            <div className={`container0 ${hovered1 ? "hideContainer0" : ""}  ${hovered2 ? "hideContainer0" : ""}`}>
                <div className="head0"></div>
     
                <div className="middle0" >
                    <span className="leftCurve"><p>{leftGoal}</p></span>
                    <div className="playersContainer">
                        <div  className="infoPlayers">
                            <div className="infoPlayer01">
                                <div className="hoverExpand1" onClick={() => {
                                    if (playerOne.playWithRobot === false)
                                        setHovered1(true)}
                                    }>
                                    <div className="infoAvatar01" ><img id="infoAvatar01" src="question-mark.jpeg" alt="imga"></img></div>
                                </div>
                            </div>
                            <div className="infoVs"><p>vs</p></div>
                            <div className="infoPlayer02">
                                <div className="hoverExpand2" onClick={() => setHovered2(true)} >
                                    <div className="infoAvatar02" ><img id="infoAvatar02" src="question-mark.jpeg" alt="imga"></img></div>
                                </div>
                            </div>
                        </div>
                        <div className="infoFooter0">
                            <div className="leftFooter0"></div>
                            <div className="rightFooter0"></div>
                        </div>
                    </div>
                    <span className="rightCurve"><p>{rightGoal}</p></span>
                </div>

            </div>

            <div className={` container1 ${hovered1 ? "displayContainer1" : "" } `} >
                
                <div className="head1">
                    <div className="playerShadow"></div>
                </div>

                <div className="middle1">
                    <span className="leftCurvePlayer1"><p>{leftGoal}</p></span>
                    <div className="player1Container">
                        <div className="info1">
                            <div className="avatar1Border">
                                <div className="info1Avatar1" onClick={() =>  setHovered1(false)}><img id="infoAvatar1" src={playerTwo.userAvatar} alt="imgA"></img></div>
                            </div>
                            <div className="achievement">
                                <div className="userName"><p>{playerTwo.userName}</p></div>
                                <div className="shields">
                                    <span className="shld"><center>Game Won<br/>{playerTwo.matchWon}</center> </span>
                                    <span className="shld"><center>Best Win<br/>{playerTwo.bestWinStreak}</center></span>
                                    <span className="shld"><center>Game Played<br />{playerTwo.matchPlyed}</center></span>
                                    <span className="shld"><center>xp<br />{playerTwo.level}</center></span>
                                    <span className="shld"><center>win streak<br />{playerTwo.tournentWon}</center></span>
                                    <span className="shld"><center>matches loss<br />{playerTwo.tournentPlayed}</center></span>
                                </div>
                            </div>
                            <div className="team"><img id="leftTeam" src={playerTwo.userLogo} alt="badge"/></div>
                        </div>
                        <div className="player1InfoFooter">
                            <div className="player1LeftFooter"></div>
                            <div className="player1RightFooter"></div>
                        </div>
                    </div>
                    <span className="rightCurvePlayer1"><p>{rightGoal}</p></span>
                </div>
                
            </div>
            
            <div className={` container2 ${hovered2 ? "displayContainer2" : "" } `}>
                
                <div className="head1">
                    <div className="playerShadow"></div>
                </div>

                <div className="middle2">
                    <span className="leftCurvePlayer2"><p>{rightGoal}</p></span>
                    <div className="player2Container">
                        <div className="info2">
                            <div className="avatar1Border">
                            <div className="info2Avatar2" onClick={() => setHovered2(false)} ><img id="infoAvatar2" src={playerOne.userAvatar} alt="imgA"></img></div>
                            </div>
                            <div className="achievement">
                                <div className="userName"><p>{playerOne.userName}</p></div>
                                <div className="shields">
                                    <span className="shld"><center>Game Won<br />{playerOne.matchWon}</center></span>
                                    <span className="shld"><center>Best Win<br />{playerOne.bestWinStreak}</center></span>
                                    <span className="shld"><center>Game Played<br />{playerOne.matchPlyed}</center></span>
                                    <span className="shld"><center>xp<br /> {playerOne.level}</center></span>
                                    <span className="shld"><center>win streak<br />{playerOne.tournentWon}</center></span>
                                    <span className="shld"><center>matches loss<br />{playerOne.tournentPlayed}</center></span>
                                </div>
                            </div>
                            <div className="team"><img id="rightTeam" src={playerTwo.userLogo} alt="badge"/></div>
                        </div>
                        <div className="player2InfoFooter">
                            <div className="player2LeftFooter"></div>
                            <div className="player2RightFooter"></div>
                        </div>
                    </div>
                    <span className="rightCurvePlayer2"><p>{leftGoal}</p></span>
                </div>

            </div>


        </div>
    );
}

export default Info;