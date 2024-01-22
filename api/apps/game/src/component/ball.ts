import GameContainer from './gamecontainer';

class Ball
{
    constructor ()
    {
    }
    
    ballX : number = 0;
    ballY : number = 0;
    ballWH : number = 0;
    ballAngle : number = 0;
    ballSpeed : number = 0;
    ballDirection : boolean | undefined = undefined;
    
    ballRightTan : number = 0;
    ballLeftTan : number = 0;
    ballTopTan : number = 0;
    ballBottomTan : number = 0;
    
    width : number = 400;
    height : number = 200;
    
    ballFirst50Time : number = 0;
    ballFirstMove : boolean = true;
    goalRestart : boolean = false;
    alertY : number = 0;
    alertDirection : boolean = true;
    ballRebounded : boolean = false;

    
    drawAndMove(data : GameContainer, nbrOfclt : number)
    {
        // if (this.goalRestart) the goal behind this code re to return racket to the middle after a goal  
        // {
        //     // console.log('fix it bro :', Math.trunc(data.lRacketY), (100 - data.lRacketH / 2), Math.trunc(data.rRacketY), 100 - data.rRacketH / 2 )
        //     if (Math.trunc(data.lRacketY) !== (100 - data.lRacketH / 2) && (Math.trunc(data.rRacketY) !== ( 100 - data.rRacketH / 2)))
        //         return
        // }
        if (this.ballFirst50Time < 250)
        {
            // if (nbrOfclt === 3)
            //     this.ballSpeed = 2.2//this.width / 200;
            // else
                this.ballSpeed = 2.2//this.width / 200;
            this.goalRestart = false;
            this.ballWH = this.height / 25;
            this.ballX = this.width / 2;
            this.ballY = this.height / 2;
            this.ballFirst50Time++;
            this.ballFirstMove = true;
        } 
        else
        {
            this.ballMove(data);
        }

    }

    ballMove(data : GameContainer)
    {
        this.ballRightTan = this.ballX + this.ballWH / 2;
        this.ballLeftTan = this.ballX - this.ballWH / 2;
        this.ballTopTan = this.ballY - this.ballWH / 2;
        this.ballBottomTan = this.ballY + this.ballWH / 2;
        if (this.ballDirection === undefined)
        {
            this.ballDirection = (Math.floor(Math.random() * (2))) ? true : false;
            if (this.ballDirection === true)
                this.ballAngle = 100;
            else
                this.ballAngle = 300;
        }
        if (this.ballFirstMove)// && data&& this.leftRacket)
        {
            if (this.ballDirection)
                this.ballX += this.ballSpeed;
            else
                this.ballX -= this.ballSpeed;
                
            if (this.ballDirection === true && this.ballRightTan >= data.rRacketX)
                this.ballFirstMove = false; 
            else if (this.ballDirection === false && this.ballLeftTan <= (data.lRacketX + data.lRacketW / 2) )
                this.ballFirstMove = false;
            if (this.ballDirection && this.ballX >= this.width && this.ballY > data.rRacketY  && this.ballY < data.rRacketY + data.rRacketH)
                this.ballX = this.width - data.rRacketW + 1;
            if (!this.ballDirection && this.ballX <= 0 && this.ballY > data.lRacketY && this.ballY < data.lRacketY + data.lRacketH)
                this.ballX = data.lRacketW - 1;
            
        } 
        
        if (this.ballFirstMove === false )
        {
            if ((this.ballDirection && this.ballX > this.width - data.rRacketW  && (this.ballY < data.rRacketY || this.ballY > data.rRacketY + data.rRacketH))
                || (!this.ballDirection && this.ballX < data.lRacketW && (this.ballY < data.lRacketY || this.ballY > data.lRacketY + data.lRacketH)))
            {
                console.log("You lose ==================== : ");
                if ((this.ballDirection && this.ballX > this.width - data.rRacketW  && (this.ballY < data.rRacketY || this.ballY > data.rRacketY + data.rRacketH)))
                {
                    data.rightPlayerGoal++;
                    if (this.ballRebounded === true)
                        data.rightPlayerRebound++;
                    else
                        data.rightPlayerStrict++;
                    // console.log("right player goal : " , data.rightPlayerGoal);
                }
                else
                {
                    data.leftPlayerGoal++;
                    if (this.ballRebounded === true)
                        data.leftPlayerRebound++;
                    else
                        data.leftPlayerStrict++;
                    // console.log("left player goal : " , data.leftPlayerGoal);
                }
                this.goalRestart = true;
                this.ballFirstMove = true;
                this.ballFirst50Time = 0;
                this.ballDirection = undefined;
            }
            else if (this.ballDirection === true && this.ballRightTan >= data.rRacketX && (this.ballY >= data.rRacketY && this.ballY <= data.rRacketY + data.rRacketH))
            {
                this.calculateRightBallRebound(data);
            }
            else if (this.ballDirection === false && this.ballLeftTan <= (data.lRacketX + data.lRacketW / 2) && (this.ballY >= data.lRacketY && this.ballY <= data.lRacketY + data.lRacketH)) 
            {
                this.calculateLeftBallRebound(data);
            }
            else if (this.ballTopTan > 0 && this.ballBottomTan < this.height )
            {
                this.calculateBallOnSpace();
            }
            else if (this.ballTopTan <= 0 || this.ballBottomTan >= this.height)
            {
                 this.calculateTopAndBottomBallRebound();
             }
        }
    }

    calculateTopAndBottomBallRebound()
    {
        this.ballRebounded = true;
        // console.log('top rebound : ', this.ballAngle)
        if (this.ballTopTan <= 0)
        {
            if (this.ballAngle >= 0 && this.ballAngle <= 100)
            {
                this.ballAngle += 100;
            }
            else if (this.ballAngle >= 300 && this.ballAngle <= 400)
            {
                this.ballAngle -= 100;
            }
            this.ballY = this.ballWH / 2 + 2;
        }
        else if (this.ballBottomTan >= this.height)
        {
            if (this.ballAngle >= 200 && this.ballAngle <= 300)
            {
                this.ballAngle += 100;
            }
            else if (this.ballAngle >= 100 && this.ballAngle < 200)
            {
                this.ballAngle -= 100;
            }
            this.ballY = (this.height - (this.ballWH / 2)) - 2;
        }
        // console.log('top rebound after : ', this.ballAngle)

    }


    calculateBallOnSpace()
    {
        let adj : number;
        let radAngle : number;
        let tmpAngle: number;

        tmpAngle = this.ballAngle;
        if (this.ballAngle > 100 && this.ballAngle < 200)
            tmpAngle = this.ballAngle - 100;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            tmpAngle = this.ballAngle - 200;
        else if (this.ballAngle >= 300 && this.ballAngle < 400)
            tmpAngle = this.ballAngle - 300;
        else if (this.ballAngle >= 400)
            tmpAngle = this.ballAngle - 400;
        radAngle = tmpAngle  * (Math.PI / 200);
        adj = this.ballSpeed / Math.tan(radAngle);
        // console.log('temp : ', adj, radAngle,tmpAngle, this.ballSpeed)
        if (tmpAngle === 100 || tmpAngle === 0)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if ((this.ballAngle >= 0 && this.ballAngle < 100) || (this.ballAngle >= 300 && this.ballAngle <= 400))
        {
                this.ballY = this.ballY - adj;
        }
        else if ((this.ballAngle >= 100 && this.ballAngle < 200) || (this.ballAngle >= 200 && this.ballAngle <= 300))
        {
                this.ballY = this.ballY + adj;
        }
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
    }

    calculateRightBallRebound(data : GameContainer)
    {
        let diff : number;
        let adj : number = 0;
        let radAngle : number;
        let tmpAngle : number;


        let ballHitTheMiddleOfRacket : number = 0; // in this case ball go straight with angle 100 or 300 depending on its direction
        let reboundAngle : number = 0;
                                    //racket height  |____|_|____|
        ballHitTheMiddleOfRacket = (data.rRacketH / 100 * 20) / 2;
        this.ballRebounded = false;
        // console.log("right ball : ", this.ballAngle) 
        if (data.rRacketY)
        {
            diff = this.ballY - data.rRacketY;
            if (diff > (data.rRacketH / 2 - ballHitTheMiddleOfRacket) && diff < data.rRacketH / 2 + ballHitTheMiddleOfRacket)
            {
                // console.log('data : ' , data.rRacketH, (data.rRacketH * 100 / 10) / 2 , diff)
                this.ballAngle = 300; // normally should be 3OO but the hardcoding make it like this i dont have time to fix it  
            }   
            else if (diff < data.rRacketH / 2)
            {
                // console.log('diss1 : ', diff, data.rRacketH / 2 + ballHitTheMiddleOfRacket , ballHitTheMiddleOfRacket)
                diff = (data.rRacketH / 2 - ballHitTheMiddleOfRacket) - diff;
                reboundAngle = (40 / (data.rRacketH / 2 - ballHitTheMiddleOfRacket)) * diff;
                this.ballAngle = 370  - reboundAngle;
                // this.ballAngle = 100 - ((data.lRacketH / 2 - diff) * 100 / data.lRacketH / 2);
            }
            else
            {
                // console.log('diss : ', diff, data.rRacketH / 2 + ballHitTheMiddleOfRacket , ballHitTheMiddleOfRacket)
                diff = diff - (data.rRacketH / 2 + ballHitTheMiddleOfRacket);
                reboundAngle =   (40 / (data.rRacketH / 2 - ballHitTheMiddleOfRacket)) * diff;
                this.ballAngle = 270 - reboundAngle;
                // this.ballAngle = 100 + ((diff - data.lRacketH / 2) * 100 / (data.lRacketH / 2)); 
            }
            // if (this.ballAngle === 200)
                // console.log("fix that problem -----------------",diff, reboundAngle, this.ballAngle)
        }

        // console.log("ball right : ", diff , reboundAngle, this.ballAngle ) 
        
        // if (data.rRacketY)
        // {
        //     diff = this.ballY - data.rRacketY;
        //     if (diff < data.rRacketH / 2)
        //         this.ballAngle = 100 - ((data.rRacketH / 2 - diff) * 100 / data.rRacketH / 2);
        //     else
        //         this.ballAngle = 100 + ((diff - data.rRacketH / 2) * 100 / (data.rRacketH / 2)); 
        //     if (this.ballAngle === 100) 
        //         console.log("fix that problem -----------------right")
        // }
        tmpAngle = this.ballAngle;
        if (this.ballAngle > 100 && this.ballAngle < 200)
            tmpAngle = this.ballAngle - 100;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            tmpAngle = this.ballAngle - 200;
        else if (this.ballAngle >= 300 && this.ballAngle < 400)
            tmpAngle = this.ballAngle - 300;
        else if (this.ballAngle >= 400)
            tmpAngle = this.ballAngle - 400;
        radAngle = tmpAngle * (Math.PI / 200);
        this.ballDirection = !this.ballDirection;
        adj = this.ballSpeed / Math.tan(radAngle);
        if (tmpAngle === 100 || tmpAngle === 0)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (this.ballAngle >= 300 && this.ballAngle <= 400)
            this.ballY = this.ballY - adj;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            this.ballY = this.ballY + adj;
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
        //if (this.ballSpeed < 2)
        //    this.ballSpeed += 0.2;
        // console.log("after right ", this.ballAngle)
    }

    calculateLeftBallRebound(data : GameContainer)
    {
        let diff : number;
        let adj : number;
        let radAngle : number;
        let tmpAngle : number ;
        let ballHitTheMiddleOfRacket : number = 0; // in this case ball go straight with angle 100 or 300 depending on its direction
        let reboundAngle : number = 0;
                                    //racket height  |____|_|____|
        ballHitTheMiddleOfRacket = (data.lRacketH / 100 * 20) / 2;
        this.ballRebounded = false;
        
        // console.log("left ball : ", this.ballAngle, this.ballY - data.lRacketY ) 
        if (data.lRacketY)
        {
            diff = this.ballY - data.lRacketY;
            if (diff > (data.lRacketH / 2 - ballHitTheMiddleOfRacket) && diff < data.lRacketH / 2 + ballHitTheMiddleOfRacket)
            {
                this.ballAngle = 100;
            }   
            else if (diff < data.lRacketH / 2)
            {
                diff = (data.lRacketH / 2 - ballHitTheMiddleOfRacket) - diff;
                reboundAngle = (40 / (data.lRacketH / 2 - ballHitTheMiddleOfRacket)) * diff;
                this.ballAngle = 70 - reboundAngle;
            }
            else
            {
                diff = diff - (data.lRacketH / 2 + ballHitTheMiddleOfRacket);
                reboundAngle =   (40 / (data.lRacketH / 2 - ballHitTheMiddleOfRacket)) * diff;
                this.ballAngle = 170 - reboundAngle;
            }
        }
        tmpAngle = this.ballAngle;
        if (this.ballAngle > 100 && this.ballAngle < 200)
            tmpAngle = this.ballAngle - 100;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            tmpAngle = this.ballAngle - 200;
        else if (this.ballAngle >= 300 && this.ballAngle < 400)
            tmpAngle = this.ballAngle - 300;
        else if (this.ballAngle >= 400)
            tmpAngle = this.ballAngle - 400;
        radAngle = tmpAngle * (Math.PI / 200);
        this.ballDirection = !this.ballDirection;
        adj = this.ballSpeed / Math.tan(radAngle);
        if (tmpAngle === 100 || tmpAngle === 0)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (this.ballAngle >= 0 && this.ballAngle < 100)
            this.ballY = this.ballY - adj;
        else if (this.ballAngle >= 100 && this.ballAngle <= 200)
            this.ballY = this.ballY + adj;
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
        // console.log("after left ", this.ballAngle)
        //if (this.ballSpeed < 2)
        //    this.ballSpeed += 0.2;
    }

}

export default Ball;