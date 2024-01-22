import RecieveBallData from "./RecieveBallData";
import SentRacketData from "./SentRacketData";
import RecieveRacketData from "./RecieveRacketData";
import Ball from './ball'

class GameContainer 
{  
    constructor()
    {
        this.ball = new Ball();
    }
  
  ball : Ball;

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
  leftPlayerGoal : number = 0;
  rightPlayerGoal : number = 0;
  leftPlayerRebound : number = 0;
  leftPlayerStrict : number = 0;
  rightPlayerRebound : number = 0;
  rightPlayerStrict : number = 0;
}
export default GameContainer;