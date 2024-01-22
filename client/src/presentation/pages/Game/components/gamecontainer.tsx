import RecieveBallData from "./RecieveBallData";
import SentRacketData from "./SentRacketData";
import SentRobotRacket from "./SentRobotRacket";


class GameContainer 
{  
    constructor()
    {
        this.ball = new RecieveBallData();
        this.recvRacket = new SentRacketData();
        this.sentRacket = new  SentRacketData();
        this.robotRacket = new SentRobotRacket();
    }
  
  init : boolean = false;
  loading : boolean = true;
  width : number = 0;
  height : number = 0;
  playerNumber : number = 0;
  
  ball : RecieveBallData;
  recvRacket : SentRacketData;
  sentRacket : SentRacketData;
  robotRacket : SentRobotRacket;
  leftPlayerGoals : number = 0;
  rightPlayerGoals : number = 0; 
  alertY : number = 0;
  
}
export default GameContainer;
/*
  
  
  
    
  init : boolean = false;
  width : number = 0;
  height : number = 0;
  
  ballX : number = 0;
  ballY : number = 0;
  ballWH : number = 0;
  ballFirst50Time = 0;
  ballSpeed : number = 0;
  ballAngle : number = 0;
  ballFirstMove : boolean = false;
  ballDirection : boolean | undefined = undefined;

  lRacketX : number = 0;
  lRacketY : number = 0;
  lRacketH : number = 0;
  lRacketW : number = 0;
  lLastPosY : number = 0;

  rRacketX : number = 0;
  rRacketY : number = 0;
  rRacketH : number = 0;
  rRacketW : number = 0;
  rLastPosY : number = 0;
  goalRestart : boolean = false;


  clientOne : boolean = false;
  clientTwo : boolean = false;*/
