import Game from './gameInstance'

class Ball
{
    constructor (game : Game)
    {
        this.game = game;
    }
    game : Game;
    ballX : number = 0;
    ballY : number = 0;
    ballWH : number = 0;
    ballFirstMove : boolean = true;
    ballDirection : boolean | undefined = undefined;
    ballAngle : number = 0;
    ballSpeed : number = 0;
    ballFirst50Time : number = 0;
    ballRightTan : number = 0;
    ballLeftTan : number = 0;
    ballTopTan : number = 0;
    ballBottomTan : number = 0;
    
    drawAndMove()
    {
        console.log("drw ball")
        this.ballSpeed = this.game.p5.width / 120;
        if (this.ballFirst50Time < 50)
        {
            this.game.goalRestart = false;
            this.ballWH = this.game.p5.height / 25;
            this.ballX = this.game.p5.width / 2;
            this.ballY = this.game.p5.height / 2;
            this.game.p5.stroke(1)
            this.game.p5.circle(this.ballX, this.ballY, this.ballWH);
            this.ballFirst50Time++;
            this.ballFirstMove = true;
        } 
        else
        {
            this.ballMove();
        }
    }

    ballMove()
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
        if (this.ballFirstMove && this.game.rightRacket && this.game.leftRacket)
        {
            if (this.ballDirection)
                this.ballX += this.ballSpeed;
            else
                this.ballX -= this.ballSpeed;
            if (this.ballDirection === true && this.ballRightTan >= this.game.rightRacket.racketX)
                this.ballFirstMove = false; 
            else if (this.ballDirection === false && this.ballLeftTan <= (this.game.leftRacket.racketX + this.game.leftRacket.racketW / 2) )
                this.ballFirstMove = false;
            if (this.ballDirection && this.ballX >= this.game.p5.width && this.ballY > this.game.rightRacket.racketY  && this.ballY < this.game.rightRacket.racketY + this.game.rightRacket.racketH)
                this.ballX = this.game.p5.width - this.game.rightRacket.racketW + 1;
            if (!this.ballDirection && this.ballX <= 0 && this.ballY > this.game.leftRacket.racketY && this.ballY < this.game.leftRacket.racketY + this.game.leftRacket.racketH)
                this.ballX = this.game.leftRacket.racketW - 1;
            this.game.p5.circle(this.ballX, this.ballY, this.ballWH);
        } 
        if (this.ballFirstMove === false && this.game.rightRacket && this.game.leftRacket)
        {
            if ((this.ballDirection && this.ballX > this.game.p5.width - this.game.rightRacket.racketW  && (this.ballY < this.game.rightRacket.racketY || this.ballY > this.game.rightRacket.racketY + this.game.rightRacket.racketH))
                || (!this.ballDirection && this.ballX < this.game.leftRacket.racketW && (this.ballY < this.game.leftRacket.racketY || this.ballY > this.game.leftRacket.racketY + this.game.leftRacket.racketH)))
            {
                // console.log("You lose ==================== : ");
                // if ((!this.ballDirection && this.ballX < this.game.leftRacket.racketW && (this.ballY < this.game.leftRacket.racketY || this.ballY > this.game.leftRacket.racketY + this.game.leftRacket.racketH)))
                //     this.game.rightPlayerGoals++;
                // else
                //     this.game.leftPlayerGoals++;
                //if (animationData.animOne === false)
               // animationData.animOne = false;
               // animationData.player = undefined;
               // animationData.chances = 0;
                this.game.goalRestart = true;
                this.ballFirstMove = true;
                this.ballFirst50Time = 0;
                this.ballDirection = undefined;
            }
            else if (this.ballDirection === true && this.ballRightTan >= this.game.rightRacket.racketX && (this.ballY >= this.game.rightRacket.racketY && this.ballY <= this.game.rightRacket.racketY + this.game.rightRacket.racketH))
            {
                this.calculateRightBallRebound();
                this.game.p5.circle(this.ballX, this.ballY, this.ballWH);
            }
            else if (this.ballDirection === false && this.ballLeftTan <= (this.game.leftRacket.racketX + this.game.leftRacket.racketW / 2) && (this.ballY >= this.game.leftRacket.racketY && this.ballY <= this.game.leftRacket.racketY + this.game.leftRacket.racketH)) 
            {
                this.calculateLeftBallRebound();
                this.game.p5.circle(this.ballX, this.ballY, this.ballWH);
            }
            else if (this.ballTopTan > 0 && this.ballBottomTan < this.game.p5.height )
            {
                this.calculateBallOnSpace();
                this.game.p5.circle(this.ballX, this.ballY, this.ballWH);
            }
            else if (this.ballTopTan <= 0 || this.ballBottomTan >= this.game.p5.height)
            {
                this.calculateTopAndBottomBallRebound();
                this.game.p5.circle(this.ballX, this.ballY, this.ballWH);
            }
        }
    }
    calculateTopAndBottomBallRebound()
    {
        let radAngle : number;
        let adj : number;
        let tmpAngle : number;

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
            this.ballTopTan = 0;
            tmpAngle = this.ballAngle;
            if (this.ballAngle > 100 && this.ballAngle < 200)
                tmpAngle = this.ballAngle - 100;
            else if (this.ballAngle >= 200 && this.ballAngle < 300)
                tmpAngle = this.ballAngle - 200;
            else if (this.ballAngle >= 300 && this.ballAngle < 400)
                tmpAngle = this.ballAngle - 300;
            else if (this.ballAngle >= 400)
                tmpAngle = this.ballAngle - 400;
            radAngle = tmpAngle  * (Math.PI / 2 / 200);
            adj = this.ballSpeed * Math.tan(radAngle); 
            if (tmpAngle === 100 || tmpAngle === 300)
                adj = 0;
            if (adj < 0)
                adj *= -1;
            if (this.ballY < 0)
                this.ballY = 0 + adj;
            else
                this.ballY += adj;
        }
        else if (this.ballBottomTan >= this.game.p5.height - this.ballWH / 2)
        {
            if (this.ballAngle >= 200 && this.ballAngle <= 300)
            {
                this.ballAngle += 100;
            }
            else if (this.ballAngle >= 100 && this.ballAngle < 200)
            {
                this.ballAngle -= 100;
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
            radAngle = tmpAngle * (Math.PI / 2 / 200);
            adj = this.ballSpeed * Math.tan(radAngle);
            if (tmpAngle === 100 || tmpAngle === 300)
                adj = 0;
            if (adj < 0)
                adj *= -1;
            if (this.ballY >= (this.game.p5.height - (this.ballWH / 2)))
                this.ballY = (this.game.p5.height - (this.ballWH / 2)) - adj;
            else
                this.ballY -= adj;
        }
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
        
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
        radAngle = tmpAngle  * (Math.PI / 2 / 200);
        adj = this.ballSpeed * Math.tan(radAngle);
        if (tmpAngle === 100 || tmpAngle === 300)
            adj = 0;
        if (adj < 0)
            adj *= -1;
        if (this.ballAngle < 100)
            this.ballY = this.ballY - adj;
        else if (this.ballAngle >= 0 && this.ballAngle < 100)
            this.ballY = this.ballY - adj;
        else if (this.ballAngle >= 100 && this.ballAngle < 200)
            this.ballY = this.ballY + adj;
        else if (this.ballAngle >= 200 && this.ballAngle < 300)
            this.ballY = this.ballY + adj;
        else if (this.ballAngle >= 300 && this.ballAngle <= 400)
            this.ballY = this.ballY - adj;
        if (this.ballDirection)
            this.ballX += this.ballSpeed;
        else
            this.ballX -= this.ballSpeed;
        if (this.ballY < 0)
            this.ballY = 0;
        if (this.ballY > this.game.p5.height - this.ballWH / 2)
            this.ballY = this.game.p5.height - this.ballWH / 2;

            
        /*if (animationData.player === undefined && ballX > animationData.animOneX && ballX < animationData.animOneX + animationData.animOneWH && ballY > animationData.animOneY && ballY < animationData.animOneY + animationData.animOneWH)
        {
            if (ballDirection)
                animationData.player = true;
            else
                animationData.player = false;
            animationData.animOne = true;
        }*/
        //console.log("coordinate : ", animOneX, animOneX + animOneWH, animOneY , animOneY + animOneY, animOneWH);

    }

    calculateRightBallRebound()
    {
        let diff : number;
        let adj : number = 0;
        let radAngle : number;
        let tmpAngle : number;
        
        if (this.game.rightRacket?.racketY)
        {
            diff = this.ballY - this.game.rightRacket.racketY;
            if (diff < this.game.rightRacket.racketH / 2)
                this.ballAngle = 100 - ((this.game.rightRacket.racketH / 2 - diff) * 100 / this.game.rightRacket.racketH / 2);
            else
                this.ballAngle = 100 + ((diff - this.game.rightRacket.racketH / 2) * 100 / (this.game.rightRacket.racketH / 2)); 
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
        radAngle = tmpAngle * (Math.PI / 2 / 200);
        this.ballDirection = !this.ballDirection;
        adj = this.ballSpeed * Math.tan(radAngle);
        if (tmpAngle === 100 || tmpAngle === 300)
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
        /*if (animationData.player === true)
        {
            animationData.chances++;
        }*/
    }

    calculateLeftBallRebound()
    {
        let diff : number;
        let adj : number;
        let radAngle : number;
        let tmpAngle : number ;

        if (this.game.leftRacket?.racketY)
        {
            diff = this.ballY - this.game.leftRacket.racketY;
            if (diff < this.game.leftRacket.racketH / 2)
                this.ballAngle = 100 - ((this.game.leftRacket.racketH / 2 - diff) * 100 / this.game.leftRacket.racketH / 2);
            else
                this.ballAngle = 100 + ((diff - this.game.leftRacket.racketH / 2) * 100 / (this.game.leftRacket.racketH / 2)); 
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
        radAngle = tmpAngle * (Math.PI / 2 / 200);
        this.ballDirection = !this.ballDirection;
        adj = this.ballSpeed * Math.tan(radAngle);
        if (tmpAngle === 100 || tmpAngle === 300)
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
        /*if (animationData.player === false)
        {
            animationData.chances++;   
        }*/
    }

}

export default Ball;