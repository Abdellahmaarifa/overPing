import p5Types from 'p5';
import Ball from './ball'
import Racket from './racket';

class GameInstance
{
    constructor (p5Instance : p5Types) 
    {
        this.p5 = p5Instance;
        this.canvasResizedHeight = this.p5.height;
        this.canvasResizedWidth = this.p5.width;
        this.leftRacket = new Racket(this, undefined, false);
        this.rightRacket = new Racket(this, undefined, true);
        this.ball = new Ball(this);
    }
    
    loading : boolean = true;
    p5 : p5Types ;
    cnv : p5Types.Renderer | null = null;
    canvasPranetDiv : p5Types.Element | null = null;
    gameBordersPixel : number = 100;
    canvasResizedWidth : number;
    canvasResizedHeight : number;
    leftRacket : Racket;
    rightRacket : Racket;
    modeOfLeftRacket : boolean | undefined = undefined;
    modeOfRightRacket : boolean | undefined = undefined;
    ball : Ball;
    goalRestart : boolean = false;
    playerNumber : number = 0;
}

export default GameInstance;