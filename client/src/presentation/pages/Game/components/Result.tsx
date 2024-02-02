//Result.tsx

class Result 
{
    plyOneId: number;
    plyTwoId: number;
    plyOneGoals: number;
    plyTwoGoals: number;
    leftPlayerRebound: number;
    leftPlayerStrict: number;
    rightPlayerRebound: number;
    rightPlayerStrict: number;

    constructor(newPlyOneId: number, newPlyTwoId: number,
        newPlyOneGoals: number, newPlyTwoGoals: number,
        newLeftPlayerRebound: number, newLeftPlayerStrict: number,
        newRightPlayerRebound: number, newRightPlayerStrict: number) 
    {
        this.plyOneId = newPlyOneId;
        this.plyTwoId = newPlyTwoId;
        this.plyOneGoals = newPlyOneGoals;
        this.plyTwoGoals = newPlyTwoGoals;
        this.leftPlayerRebound = newLeftPlayerRebound;
        this.leftPlayerStrict = newLeftPlayerStrict;
        this.rightPlayerRebound = newRightPlayerRebound;
        this.rightPlayerStrict = newRightPlayerStrict;
    }
}

export default Result;
