class RecieveBallData
{  
    constructor()
    {}

    ballX : number = 0;
    ballY : number = 0;
    ballWH : number = 0;
    ballDirection : boolean | undefined = undefined;
    ballSpeed : number = 0;
    ballAngle : number = 0;
    goalRestart : boolean = false;
    leftPlayerGoal : number = 0;
    rightPlayerGoal : number = 0;

}
export default RecieveBallData;