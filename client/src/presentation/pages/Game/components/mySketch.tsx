import p5Types from 'p5';
import Game from './gameInstance';
import GameContainer from './gamecontainer';
import UserInfo from './UserInfo';
//import weapon 
import Weapon from './Weapon';
import WeaponTemplate from './WeaponTemplate';
//sound library
import { Howler } from 'howler';
import SoundsClass from './Sound';
// import Coins from './Coins';
// import PlayerWeapon from './PlayerWeapon';

interface MySketchProp
{
  gameCapsule : GameContainer;
  p5 : p5Types;
  playerOne : UserInfo;
  playerTwo : UserInfo;
  weaponTemplate : WeaponTemplate;
  updateMatchState : (val : boolean) => void;
};


let weapon = new Weapon();
Howler.volume(1.0);


let img1 : p5Types.Element | p5Types.Image;
let img2 : p5Types.Element | p5Types.Image;
let img3 : p5Types.Element | p5Types.Image;
// let coins : Coins = new Coins();

let Sounds : SoundsClass = new SoundsClass();
// let muteSound : boolean = true;

/* Draw the middle line */
let line = (game : Game) : void => 
{
  game.p5.noStroke();
  game.p5.fill('gray');
  game.p5.rect(game.p5.width / 2 - 2, 0 , 4 , game.p5.height); 
  // game.p5.rect(0, game.p5.height / 2 - 3 , game.p5.width, 6);
  game.p5.fill('white');
}

/* resize the canvas window to be responsive */
let resizeCanvas = (game : Game) : void => 
{
  let canvasWidth : number;
  let canvasHeight : number; 
 
  game.canvasPranetDiv = game.p5.select('#layout'); 
  if (game.canvasPranetDiv)
  {
    canvasWidth = (game.canvasPranetDiv.elt.clientWidth )// game.gameBordersPixel; //the game..xel is the number of pixel give to canvas borders 
    canvasHeight = game.canvasPranetDiv.elt.clientHeight //- game.gameBordersPixel;
    if (canvasWidth > canvasHeight)
    {
      canvasWidth = canvasHeight //- canvasHeight / 3
      canvasHeight = canvasWidth / 2
    }
    else 
    {
      canvasWidth = canvasWidth //- canvasWidth / 4
      canvasHeight = canvasWidth / 2
    }
    game.p5.resizeCanvas(canvasWidth, canvasHeight);
    if (Sounds.soundButton)
    {
      Sounds.soundButton.size(game.canvasPranetDiv.elt.clientWidth / 14)
      Sounds.soundButton.style("z-index", "6");
      Sounds.soundButton.style("font-size", "1.5vmin");
      Sounds.soundButton.style("background-color", "white");
      Sounds.soundButton.position(game.canvasPranetDiv.elt.clientWidth / 2 - (game.canvasPranetDiv.elt.clientWidth / 28 ), 0, 'absolute')
    }

  }
  else
  {
    console.log("The game div selector return null.");
  }
}

interface drawProps
{
  game : Game;
  gameCapsule : GameContainer;
  playerOne : UserInfo;
  playerTwo : UserInfo;
  weapon : Weapon;
  weaponTemplate : WeaponTemplate;
  updateMatchState : (val : boolean) => void;
}


function draw({game , gameCapsule , playerOne , playerTwo , weapon , weaponTemplate , updateMatchState} : drawProps) 
{
  let ballX; 
  let ballY;
  let ballWH;
  let ballSpeed;


  return () => 
  {
    // get player number from the server
    game.playerNumber = gameCapsule.playerNumber;
    if (game.playerNumber === 0 && playerOne.playWithRobot === true)
      game.playerNumber = 3;
    //end

    //resive the canvas if the player change the browser window size
    resizeCanvas(game);
    //end

    //set Weapon emit data
    weaponTemplate.alertY = weapon.alertY;
    // end

    //assign background image
    if (img1)
      game.p5.image(img1, 0, 0, game.p5.width, game.p5.height)
    else if (img2)
      game.p5.image(img2, 0, 0, game.p5.width, game.p5.height)
    else if (img3)
      game.p5.image(img3, 0, 0, game.p5.width, game.p5.height)
    else
      game.p5.background(0);
      //end

    // draw middle line
    if (gameCapsule.leftPlayerGoals < 5 && gameCapsule.rightPlayerGoals < 5)
      line(game);
    //end

    //mode 3 put images
    // if (playerOne.modePlaying === 3)
    // {
    //     weapon.displayAlert(game);
    //     weapon.displayPrize(game, gameCapsule.playerNumber)
    //     weapon.displayHearts(weapon.plyOne.playerHearts, weapon.plyTwo.playerHearts, game)
    // }
    //end
    
    // display coins images 
    // if (playerOne.modePlaying === 2 )
    // {
    //   coins.displayCoinsImages(game);
    // }

    // end




    // sound botton click event 
    if (Sounds && Sounds.soundButton)
      Sounds.soundButton.mousePressed(() => Sounds.changeSoundOpetion())
    //end
    
    //display mode music
    Sounds.displayModeMusic(playerOne.modePlaying) 
    //end

    // get current player canvas width and height
    gameCapsule.width = game.p5.width;
    gameCapsule.height = game.p5.height;
    game.goalRestart = gameCapsule.ball.goalRestart;
    // end;

    
    // assign initial data to variables after a goal
    if (game.goalRestart)
    {
      game.rightRacket.racketY = -100;
      game.leftRacket.racketY = -100;
      game.rightRacket.keyIsPress = false;
      game.rightRacket.coordinateAlreadyGot = false;
      game.leftRacket.coordinateAlreadyGot = false;
      game.rightRacket.startOfSimulation = true;
      game.leftRacket.startOfSimulation = true;
      setTimeout(() => {
        gameCapsule.init = false;
      }, 500);
      game.rightRacket.mouseIsMoved = false;
      //stop freeze action
      game.leftRacket.racketFreezed = false;
      game.rightRacket.racketFreezed = false;
      // play goal sounds
      // if (gameCapsule.leftPlayerGoals < 5 && gameCapsule.rightPlayerGoals < 5)
      if (Sounds.muteSound)
      {
        if ((gameCapsule.playerNumber === 1 || gameCapsule.playerNumber === 3) && gameCapsule.ball.ballX < 0 + gameCapsule.ball.ballWH)
          Sounds.goalSound.play();
        else if ((gameCapsule.playerNumber === 1 || gameCapsule.playerNumber === 3) && gameCapsule.ball.ballX > 400 - gameCapsule.ball.ballWH)
          Sounds.opponentGoalSound.play()
        if (gameCapsule.playerNumber === 2 && gameCapsule.ball.ballX > 400 - gameCapsule.ball.ballWH)
          Sounds.goalSound.play();
        else if (gameCapsule.playerNumber === 2 && gameCapsule.ball.ballX < 0 + gameCapsule.ball.ballWH)
          Sounds.opponentGoalSound.play() 
      }
      //end
    } 
    //end

    // get first mouse event
    game.cnv?.mouseMoved(() => game.rightRacket.mouseIsMoved = true)
    //end
   
    // left and right racket get the coordinate of the ball so they can calculate the virtual rebound of the ball
    if (game.rightRacket.coordinateAlreadyGot === false)
    {
      if (game.ball.ballX > 80 && game.ball.ballX < game.p5.width - 50)
      {
        game.rightRacket.virtualBallX = gameCapsule.ball.ballX;
        game.rightRacket.virtualBallY = gameCapsule.ball.ballY;
        game.rightRacket.virtualBallWH = gameCapsule.ball.ballWH;
        game.rightRacket.virtualBallS = gameCapsule.ball.ballSpeed;
        game.rightRacket.virtualBallA = gameCapsule.ball.ballAngle;
        game.rightRacket.validCoordinate = true;
      }
      else
        game.rightRacket.validCoordinate = false;
    }

    //get ball coordinate  0| 50_______350 |400
    if (game.leftRacket.coordinateAlreadyGot === false)
    {
      if (game.ball.ballX > 50 && game.ball.ballX < game.p5.width - 50)
      {
        game.leftRacket.virtualBallX = gameCapsule.ball.ballX;
        game.leftRacket.virtualBallY = gameCapsule.ball.ballY;
        game.leftRacket.virtualBallWH = gameCapsule.ball.ballWH;
        game.leftRacket.virtualBallS = gameCapsule.ball.ballSpeed;
        game.leftRacket.virtualBallA = gameCapsule.ball.ballAngle;
        game.leftRacket.validCoordinate = true;
      }
      else
        game.leftRacket.validCoordinate = false;
    }
    // end


    

    // get ball coordinate , convert it to player canvas size and assign it to a loacal variables
    ballX     = (gameCapsule.ball.ballX * game.p5.width / 400);
    ballY     = (gameCapsule.ball.ballY * game.p5.height / 200);
    ballWH    = (gameCapsule.ball.ballWH * game.p5.height / 200);
    ballSpeed = (gameCapsule.ball.ballSpeed * game.p5.width / 400);

    



     

    // make racket sound
    if (Sounds.muteSound)
    {
      Sounds.displayRacketReboundSound(gameCapsule, game, ballX , ballY , ballWH);
    }
    // end



    // top buttom rebound sound
    if (Sounds.muteSound)
    {
      Sounds.displayTopBottomRebound(game , ballY , ballWH)
    }
    // end


    // assign ball cordinate to glable object
    game.ball.ballX = ballX;
    game.ball.ballY = ballY;
    game.ball.ballWH = ballWH;
    game.ball.ballSpeed = ballSpeed;
    game.ball.ballAngle = gameCapsule.ball.ballAngle;
    game.ball.ballDirection = gameCapsule.ball.ballDirection;
    // ends

    // call of the racket depending on player opetions
    if (playerOne.playWithMouse === 1)
      game.rightRacket.drawAndMoveRacketWithMouse();
    else if (playerOne.playWithMouse === 2)
      // game.rightRacket.automaticRacket();
      game.rightRacket.MoveRacketWithKeyBoard();
    else
      game.rightRacket.automaticRacket();

    if (playerOne.playWithRobot === true)
    {
      game.leftRacket.automaticRacket();
      // console.log("data not reach the end point ", game.leftRacket.racketX , game.leftRacket.racketY, game.leftRacket.racketH, game.leftRacket.racketW )
    }
    // else
    //   console.log("something go wrong")
    // ends of racket call
    
    // convert ball coordinate depending on player side (both player are in the right side)
    if (game.playerNumber === 2)
    {
      let tmpBallX : number = 400 - gameCapsule.ball.ballX; 
      ballX                  = (tmpBallX * game.p5.width / 400);
      game.ball.ballX        = ballX;
    }
    // end 

    // get/hit a coin
    //(game : Game, gameCapsule : GameContainer, ballX : number , ballY : number, playerNu)
    // if (playerOne.modePlaying === 2)
    // {
    //   coins.ballHitCoins(game, gameCapsule, ballX, ballY)
    // }
    
    // end>



    // assing racket date to the global object so it will be emited the opponent player
    if (playerOne.playWithRobot === false)
    {
      gameCapsule.sentRacket.lastPosY = game.rightRacket.lastPositionOfRacketY;
      gameCapsule.sentRacket.height = game.p5.height;
      gameCapsule.sentRacket.width = game.p5.width;
    }
    else if (playerOne.playWithRobot)
    {
      gameCapsule.robotRacket.lastPosY = game.rightRacket.lastPositionOfRacketY;
      gameCapsule.robotRacket.robotLastPosY = game.leftRacket.lastPositionOfRacketY;
      gameCapsule.robotRacket.height = game.p5.height;
      gameCapsule.robotRacket.width = game.p5.width;
      gameCapsule.playerNumber = 3;
    }
    // end
   
    
    //ball hit alert
    // if (playerOne.modePlaying === 3)
    // {
    //   weapon.alertY = gameCapsule.alertY * game.p5.height / 200;
    //   weapon.isBallHitTheAlert(ballX, ballY, gameCapsule.ball.ballDirection, game, gameCapsule.playerNumber)
    //   weapon.choseWeapon(game, gameCapsule.playerNumber, gameCapsule.ball.ballDirection as boolean);
    //   if (weapon.plyOne.displayWeaponImg)
    //   {
    //     if (weapon.plyOne.WeaponIndex === 0)
    //       weapon.heartAction(game)
    //     else if (weapon.plyOne.WeaponIndex === 1)
    //       weapon.freezeAction(game);
    //     else if (weapon.plyOne.WeaponIndex === 2)
    //       weapon.rocketAction(game, gameCapsule);
    //   }
    //   else if (weapon.plyTwo.displayWeaponImg)
    //   {
    //     if (weapon.plyTwo.WeaponIndex === 0)
    //       weapon.heartAction(game)
    //     else if (weapon.plyTwo.WeaponIndex === 1)
    //       weapon.freezeAction(game);
    //     else if (weapon.plyTwo.WeaponIndex === 2)
    //       weapon.rocketAction(game, gameCapsule);
    //   }
    // }
  
    //end
    
    // assign true ti init when all data (ball racket) are ready (we can start the draw!!!)
    gameCapsule.init = true;
    //end
    // draw the ball , oppenent racket , the game is <over> and loading
    if (gameCapsule.ball.ballX && gameCapsule.ball.ballY)
    {
      if (gameCapsule.leftPlayerGoals < 5 && gameCapsule.rightPlayerGoals < 5 && weapon.plyOne.playerHearts > 0 && weapon.plyTwo.playerHearts > 0)
      {
        game.p5.circle(ballX, ballY, ballWH);
        if (playerOne.playWithRobot === false)
          game.p5.rect(0, gameCapsule.recvRacket.lastPosY / gameCapsule.recvRacket.height * game.p5.height, game.p5.width / 80, game.p5.height / 4);
      }
      else
      {
        
        // mode 3 win lose
        // if (playerOne.modePlaying === 3)
        // {
        //   if (weapon.plyOne.playerHearts <= 0)
        //   {
        //     setTimeout(() => {
        //       updateMatchState(false);
        //     }, 1000)
        //   }
        //   else if (weapon.plyTwo.playerHearts <= 0)
        //   {
        //     setTimeout(() => {
        //       updateMatchState(true);
        //     }, 1000)
        //   }
        // }
        //end
        Howler.stop();
        if (playerOne.modePlaying === 1)
          Sounds.mode1Music.stop()
        if (playerOne.modePlaying === 2)
          Sounds.mode2Music.stop()
        if (playerOne.modePlaying === 3)
          Sounds.mode3Music.stop()
        game.p5.fill('#bdebf6')
        game.p5.textSize(game.p5.width / 12);
        let txtW = game.p5.textWidth('The game is <over>')
        game.p5.text("The game is <over>", game.p5.width / 2 - txtW / 2,  game.p5.height / 2); 
        game.p5.fill('white')
      }  
    }
    else
      game.p5.text("loading", 20, 20); 
  }
  //end
}

function setup(game : Game) 
{
  let canvasWidth : number;
  let canvasHeight : number;

  return () => 
  {
    game.canvasPranetDiv = game.p5.select('#layout');
    
    if (game.canvasPranetDiv)
    {
      canvasWidth = game.canvasPranetDiv.elt.clientWidth; 
      canvasHeight = (game.canvasPranetDiv.elt.clientWidth / 2) ;
      if  (game.canvasPranetDiv.elt.clientHeight <= 300)
        canvasHeight = 150;
      game.cnv = game.p5.createCanvas( canvasWidth ,  canvasHeight);
      game.cnv.parent('layout');
      game.canvasResizedHeight = canvasHeight;
      game.canvasResizedWidth = canvasWidth;
      Sounds.soundButton = game.p5.createButton('mute');
      Sounds.soundButton.parent("#muteBtn")
      Sounds.soundButton.size(game.canvasPranetDiv.elt.clientWidth / 14)
      Sounds.soundButton.style("z-index", "6");
      Sounds.soundButton.style("font-size", "1.5vmin");
      Sounds.soundButton.style("background-color", "white");
      Sounds.soundButton.position(game.canvasPranetDiv.elt.clientWidth / 2 - (game.canvasPranetDiv.elt.clientWidth / 28 ), 0, 'absolute');

    }
    else
      console.log("Error: in sketch file, failed to select the parent of canvas element.")
  };
}







// function MySketch(gameCapsule : GameContainer,  p5: p5Types , playerOne : UserInfo, playerTwo : UserInfo, weaponTemplate : WeaponTemplate, updateMatchState )
function MySketch({gameCapsule ,  p5 , playerOne , playerTwo , weaponTemplate , updateMatchState } : MySketchProp )
{
  let game: Game | null = null;
  // let weapon : 
  const setupGame = () => 
  {
    game = new Game(p5);
    
    // load images for background and sounds effect 

    game.p5.preload = () =>
    {
      if (game && playerOne.modePlaying === 1)
        img1 = game.p5.loadImage('./BackgroundImages/background_image1.jpg')
      if (game && playerOne.modePlaying === 2)
        img2 = game.p5.loadImage("./BackgroundImages/background_image2.jpg")
      if (game && playerOne.modePlaying === 3)
        img3 = game.p5.loadImage("./BackgroundImages/background_image3.jpg")
      Sounds.loadSounds();
      //animation make it the game slow
      // if (playerOne.modePlaying === 2 && game && coins )
      //   coins.coinImage = game.p5.loadImage("./animationImages/coin.png")
      // if (game && playerOne.modePlaying === 3)
      //   weapon.loadImages(game)
      
    }
    game.p5.setup = setup(game);
    game.p5.draw = draw({game, gameCapsule, playerOne, playerTwo, weapon, weaponTemplate, updateMatchState});
  };

  // Call setupGame once when the component mounts
  if (!game)
  {
    setupGame();
  }
}
export default MySketch;
export { Sounds };
export { weapon };