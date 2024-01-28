import './App.css';
import React, { useEffect } from 'react';
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { io, Socket } from 'socket.io-client';
import MySketch from './mySketch';
import GameContainer from './gamecontainer';
import SentRacketData from './SentRacketData';
import RecieveBallData from './RecieveBallData';
import UserInfo from './UserInfo';
import { weapon } from './mySketch';
import WeaponTemplate from './WeaponTemplate';
//import { Sounds } from './mySketch';
//import { Howler } from 'howler';

let weaponTemplate : WeaponTemplate = new WeaponTemplate();

// Function to generate a unique tab identifier
function generateUniqueTabId(): string 
{
  return Date.now().toString();
}
const tabId = generateUniqueTabId();

const serverUrl: string = 'ws://localhost:4055';
interface AppProps
{
  gameCapsule : GameContainer;
  playerOne : UserInfo;
  playerTwo : UserInfo;
  updateMatchState : (val : boolean) => void;
  updateServerState : (val : boolean) => void;
}


function App({ gameCapsule, playerOne, playerTwo , updateMatchState , updateServerState}: AppProps ) 
{

  //let gameCapsule: GameContainer = new GameContainer();
  let socket: Socket | null = null;
  

  // send ball , racket data to the server
  const sendDataToServer = () => 
  {
    if (socket && gameCapsule.init) 
    {
      //animation 
      // if (weapon.ballHitAlert && weapon.getIndex === false)
      //   socket.emit('randomNumberRequest')
      // socket.emit('customWeaponEventRequest', weaponTemplate)
      //end
      socket.emit('customEventDataRequestBall');
      if (playerOne.playWithRobot === false)
        socket.emit('customEventDataRequestRacket', gameCapsule.sentRacket);
      else if (playerOne.playWithRobot)
        socket.emit('customEventRobotRacket', gameCapsule.robotRacket);
    }
  };

  // Function to handle WebSocket events:
  const setupSocket = (ID : string, tabId : string) => 
  {
    socket = io(serverUrl, { path: '/game-container'
    , transports: ['websocket'], query: { ID , tabId} });

    socket.on('connect', () => {
      //console.log(`App Connected to WebSocket server in tab id ${tabId}`);
    });

    socket.on('disconnect', () => {
      //console.log(`App Disconnected from WebSocket server in tab ${tabId}`);
      //Howler.stop();
      //Sounds.mode1Music.stop();
      //Sounds.mode2Music.stop();
      //Sounds.mode3Music.stop();
      updateServerState(true);
    });

    socket.on('customEventDataResponseBall', (data : RecieveBallData) =>
    {
      //console.log(`get response from server : ${tabId}`, gameCapsule.ball.ballX, gameCapsule.ball.ballY, data.ballX, data.ballY);
        gameCapsule.ball.ballX = data.ballX;
        gameCapsule.ball.ballY = data.ballY;
        gameCapsule.ball.ballWH = data.ballWH;
        gameCapsule.ball.ballDirection = data.ballDirection;
        gameCapsule.ball.ballSpeed = data.ballSpeed;
        gameCapsule.ball.goalRestart = data.goalRestart;
        gameCapsule.ball.ballAngle = data.ballAngle;
        gameCapsule.leftPlayerGoals = data.leftPlayerGoal;
        gameCapsule.rightPlayerGoals = data.rightPlayerGoal;
        if (gameCapsule.ball.goalRestart)
          gameCapsule.init = false;
        // console.log("up : ", localGoal.leftPlayerGoals, localGoal.rightPlayerGoals, globalGoal.leftPlayerGoals, globalGoal.rightPlayerGoals)

    });
    
    socket.on('getWeaponData', (data : WeaponTemplate) =>
    {
      gameCapsule.alertY = data.alertY ;
    }
    )

    socket.on('getRandomNumberResponse', (random : number) =>
    {
      if (gameCapsule.playerNumber === 1)
      {
        if (weapon.ballDirectionOnhit === false)
        {
          weapon.plyOne.WeaponIndex = random
          weapon.plyTwo.WeaponIndex = -1;
        }
        else
        {
          weapon.plyOne.WeaponIndex = -1;
          weapon.plyTwo.WeaponIndex = random; 
        }
      }
      if (gameCapsule.playerNumber === 2)
      {
        if (weapon.ballDirectionOnhit === true)
        {
          weapon.plyOne.WeaponIndex = -1;
          weapon.plyTwo.WeaponIndex = random; 
        }
        else
        {
          weapon.plyOne.WeaponIndex = random;
          weapon.plyTwo.WeaponIndex = -1;
        }
      } 
      weapon.getIndex = true;
    })

    socket.on('customEventDataResponseRacket', (data: SentRacketData) => 
    {
        gameCapsule.recvRacket.lastPosY = data.lastPosY;
        gameCapsule.recvRacket.width = data.width;
        gameCapsule.recvRacket.height = data.height;
    });

    socket.on('getPlayerNumber', (plyNumber) =>
    {
        gameCapsule.playerNumber = plyNumber;
        if (playerOne.playWithRobot)
        {
          gameCapsule.playerNumber = 3;
        }
        // console.log("player Number is : ", gameCapsule.playerNumber);
    });

    socket.on('connect_error', (error) => {
      console.error('Error connecting to the WebSocket server:');
    });

    socket.on('connect_timeout', (timeout) => {
      console.error('Connection to the WebSocket server timed out:', timeout);
    });
  };

  useEffect(() => {
     setupSocket(playerOne.matchId, playerOne.tabId); // Initialize WebSocket when the component mounts
    const intervalId =  setInterval(sendDataToServer, 10);

    return () => {
      clearInterval(intervalId); // Clean up the interval when the component unmounts
      if (socket) {
        socket.disconnect(); // Close the WebSocket connection
      }
    };
  }, []); // Use an empty dependency array to run this effect only once

 




  return (
    <ReactP5Wrapper sketch={(p5) => MySketch({gameCapsule, p5, playerOne, playerTwo, weaponTemplate, updateMatchState })} />
  );
}

export default App;


// export { userInfo1 , userInfo2 };
export { tabId };