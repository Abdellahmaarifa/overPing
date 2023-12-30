import React, { useState, useEffect } from "react";
import { io, Socket } from 'socket.io-client';
import './Info.css';
import Goals from "./Goals";
import UserInfo from "./UserInfo";

const serverUrl: string = 'ws://localhost:4055';
let socket: Socket | null = null;

interface InfoProps
{
    playerOne : UserInfo;
    playerTwo : UserInfo;
    updateMatchState : (val : boolean ) => void;
}


function Info({playerOne, playerTwo, updateMatchState} : InfoProps) 
{
    const [leftGoal, setLeftGoal] = useState(0);
    const [rightGoal, setRightGoal] = useState(0);
    const [playerNumber, setPlayerNumber] = useState(0);
    const [ID, setUsrId] = useState("A" + playerOne.matchId);
    
    //get room Match id before establish a connection
    useEffect(() => 
    {
        // Define a function to periodically check and update UsrId
        const checkUsrId = () => {
        if (ID === undefined) {
            // Continue checking until UsrId is defined
            setTimeout(() => 
            {
                setUsrId("A" + playerOne.matchId);

            }, 1000); // Check every second
        }
        };

        checkUsrId();
    }, [ID]);

    const sendDataToServer = (tabId : string) =>
    {
        if (socket && ID)
        {
            // console.log("the id ", ID)
            socket.emit('customGoalsEvent', {ID , tabId});
        }
    };

    //continuously get goals data
    const setUpSocket = (tabId : string) =>
    {
        if (ID !== undefined) 
        {
            socket = io(serverUrl, 
            {
                path: '/game-container',
                transports: ['websocket'],
                query: { ID , tabId}
            });

            socket.on('connect', () => {
                console.log(`info Connected to WebSocket server`);
            });

            socket.on('disconnect', () => {
                console.log(`info Disconnected from WebSocket server`);
            });

            socket.on('playerLeaveTheGame', () =>
            {
                console.log('event is come')
                if (leftGoal !== 5 && rightGoal !== 5)
                    updateMatchState(true)
            })

            socket.on('goalsEvent', (goal : Goals) => 
            {
                setPlayerNumber(goal.playerNumber)
                setLeftGoal(goal.rightPlayerGoals);
                setRightGoal(goal.leftPlayerGoals);
                if (goal.leftPlayerGoals === 5 || goal.rightPlayerGoals === 5)
                {
                    setTimeout(() => {
                        if (goal.rightPlayerGoals === 5)
                            updateMatchState(false);
                        else
                            updateMatchState(true);
                    }, 3000);
                }
                // console.log("player n : " , goal.playerNumber);
            });
        }
        else
            console.log()
    }

    useEffect(() => 
    {
        setUpSocket(playerOne.tabId);
        const intervalId = setInterval(() => sendDataToServer(playerOne.tabId), 500);
        
        return () => {
            clearInterval(intervalId)
            if (socket)
            {
                socket.disconnect();
            }
        };
    }, []);



    //hover effect and display user info
    const [hovered1, setHovered1] = useState(false);
    const [hovered2, setHovered2] = useState(false);

    // console.log("ply ", gameCapsule.playerNumber, leftGoal, rightGoal);
    setTimeout(() => {

        let leftImg : HTMLElement | null = document.getElementById("infoAvatar01");
        let leftImgInfo : HTMLElement | null = document.getElementById("infoAvatar1");
        let rightImg : HTMLElement | null = document.getElementById("infoAvatar02");
        let rightImgInfo : HTMLElement | null = document.getElementById("infoAvatar2");
        
        if (leftImg && leftImgInfo && rightImg && rightImgInfo)
        {
            leftImg.setAttribute('src', playerTwo.userAvatar);
            leftImgInfo.setAttribute('src', playerTwo.userAvatar);
            rightImg.setAttribute('src', playerOne.userAvatar );
            rightImgInfo.setAttribute('src', playerOne.userAvatar );
        }
    }, 100)


    // if (playerNumber === 1)
    // {
    //     Usr.userAvatar = "kilua.jpg"    
    //     Usr2.userAvatar = "machi.jpg"    
    // }


    // if (playerNumber === 2)
    // {
    //     Usr.userAvatar = "machi.jpg"
    //     Usr2.userAvatar = "kilua.jpg"
    // }

    // if (leftImg && leftImgInfo && playerNumber)
    // {
    //     leftImg.setAttribute('src', Usr2.userAvatar);
    //     leftImgInfo.setAttribute('src', Usr2.userAvatar);
    // }

    // if (rightImg && rightImgInfo && playerNumber)
    // {
    //     rightImg.setAttribute('src', Usr.userAvatar );
    //     rightImgInfo.setAttribute('src', Usr.userAvatar );
    // }

    return (
        <div id="muteBtn" className="playersInfo">
            
            <div className={`container0 ${hovered1 ? "hideContainer0" : ""}  ${hovered2 ? "hideContainer0" : ""}`}>
                <div className="head0"></div>
     
                <div className="middle0" >
                    <span className="leftCurve"><p>{leftGoal}</p></span>
                    <div className="playersContainer">
                        <div  className="infoPlayers">
                            <div className="infoPlayer01">
                                <div className="hoverExpand1" onClick={() => setHovered1(true)}>
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
                                <div className="info1Avatar1" onClick={() =>  setHovered1(false)}><img id="infoAvatar1" src="question-mark.jpeg" alt="imgA"></img></div>
                            </div>
                            <div className="achievement">
                                <div className="userName"><p>{playerOne.userName}</p></div>
                                <div className="shields">
                                    <span className="shld">🐲 **</span>
                                    <span className="shld">🔑 *</span>
                                    <span className="shld">🌋 *****</span>
                                    <span className="shld">🍄 ****</span>
                                    <span className="shld">💎 ***</span>
                                    <span className="shld">🍫 ****</span>
                                </div>
                            </div>
                            <div className="team"></div>
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
                            <div className="info2Avatar2" onClick={() => setHovered2(false)} ><img id="infoAvatar2" src="question-mark.jpeg" alt="imgA"></img></div>
                            </div>
                            <div className="achievement">
                                <div className="userName"><p>{playerTwo.userName}</p></div>
                                <div className="shields">
                                    <span className="shld">💰 ***</span>
                                    <span className="shld">🐳 *****</span>
                                    <span className="shld">🔮 **</span>
                                    <span className="shld">🏜 *****</span>
                                    <span className="shld">🥇 ***</span>
                                    <span className="shld">🍹 *****</span>
                                </div>
                            </div>
                            <div className="team"></div>
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



/*import React , { useState } from "react";
import { io, Socket } from 'socket.io-client';
// import { gameCapsule } from "./App";
import './Info.css'
import { log } from "console";
import GameContainer from "../components/gamecontainer";
import { gameCapsule } from "./ParentComponent";
import { userInfo as Usr } from "./App";
// function Info ({ goals }: { goals: Goals } )



const serverUrl: string = 'ws://localhost:4055';
const UsrId = "A" + Usr.matchId

function Info ( )
{
    let leftGoal : number = 0;
    let rightGoal : number = 0;
    while (UsrId === undefined)
    {
        setTimeout(function() {
            console.log("End");
        }, 1000);
    }

    let socket: Socket | null = null;
    socket = io(serverUrl, { path: '/game-container', transports: ['websocket'], query: { UsrId }});

    socket.on('connect', () => {
      console.log(`Connected to WebSocket server`);
    });

    socket.on('disconnect', () => {
      console.log(`Disconnected from WebSocket server`);
    });


    
    const [hovered1, setHovered1] = useState(false);
    const [hovered2, setHovered2] = useState(false);
    if (gameCapsule.playerNumber === 1)
    {
        rightGoal = gameCapsule.leftPlayerGoals
        leftGoal = gameCapsule.rightPlayerGoals
    }
    else if (gameCapsule.playerNumber === 2)
    {
        leftGoal = gameCapsule.leftPlayerGoals
        rightGoal = gameCapsule.rightPlayerGoals
    }
    console.log("ply ", gameCapsule.playerNumber, leftGoal, rightGoal);

    return (
        <div className="playersInfo">
            
            <div className={`container0 ${hovered1 ? "hideContainer0" : ""}  ${hovered2 ? "hideContainer0" : ""}`}>
                
                <div className="head0"></div>
     
                <div className="middle0" >
                    <span className="leftCurve"><p>{leftGoal}</p></span>
                    <div className="playersContainer">
                        <div  className="players"  >
                            <div className="player1">
                                <div className="hoverExpand1" onClick={() => setHovered1(true)} >
                                    <div className="avatar1" ></div>
                                </div>
                            </div>
                            <div className="vs"><p>vs</p></div>
                            <div className="player2">
                                <div className="hoverExpand1" onClick={() => setHovered2(true)} >
                                    <div className="avatar2"></div>
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
                            <div className="info1Avatar1" onClick={() =>  setHovered1(false)}></div>
                            <div className="achievement">
                                <div className="userName"><p>Hunter 111</p></div>
                                <div className="shields">
                                    <span className="shld">🐲 **</span>
                                    <span className="shld">🔑 *</span>
                                    <span className="shld">🌋 *****</span>
                                    <span className="shld">🍄 ****</span>
                                    <span className="shld">💎 ***</span>
                                    <span className="shld">🍫 ****</span>
                                </div>
                            </div>
                            <div className="team"></div>
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
                            <div className="info2Avatar2" onClick={() => setHovered2(false)} ></div>
                            <div className="achievement">
                                <div className="userName"><p>Machi  </p></div>
                                <div className="shields">
                                    <span className="shld">💰 ***</span>
                                    <span className="shld">🐳 *****</span>
                                    <span className="shld">🔮 **</span>
                                    <span className="shld">🏜 *****</span>
                                    <span className="shld">🥇 ***</span>
                                    <span className="shld">🍹 *****</span>
                                </div>
                            </div>
                            <div className="team"></div>
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
    )   
};

export default Info;
*/