class Goals
{
    constructor ()
    {
        this.leftPlayerGoals = 0;
        this.rightPlayerGoals = 0;
        this.playerNumber = 0;
        this.leftPlayerRebound  = 0;
        this.leftPlayerStrict   = 0;
        this.rightPlayerRebound = 0;
        this.rightPlayerStrict  = 0;
    }

    leftPlayerGoals : number;
    rightPlayerGoals : number;
    playerNumber: number;
    leftPlayerRebound : number;
    leftPlayerStrict : number;
    rightPlayerRebound : number;
    rightPlayerStrict : number;
};

export default Goals;