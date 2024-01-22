import p5Types from 'p5'
import Game from './gameInstance'
import GameContainer from './gamecontainer';

class Coins
{
  coinImage : p5Types.Element | p5Types.Image | null = null;
  playerOneCoins : number = 0;
  playerTwoCoins : number = 0;
  coordinates : number [] = [4]
  isShapeCalc : boolean = false;
  displayShape : number = 1;
  moveDirection : boolean = true; 
  moveStep : number = 0;
  nbrOfCoin : number = 12;

  
  calcShape = (game : Game) =>
  {
    while (this.coordinates.length)
      this.coordinates.pop();
    if (this.displayShape === 1)
    {
      let index_x : number = 0;
      while (index_x < 3)
      {
        let index_y : number = 0;
        while (index_y < 4)
        {
          this.coordinates.push((game.p5.width / 4 ) * (index_x + 1)- (game.p5.width / 20 / 2))
          this.coordinates.push(game.p5.height / 5 + game.p5.height / 5  * index_y)
          index_y++;
        }
        index_x++;
      }
    }
    this.isShapeCalc = true;
    this.nbrOfCoin = 12;
  }

  displayCoinsImages = (game : Game) =>
  {
    if (this.coinImage )
    {
        let coinsSize1 : number = 0;
        // let coinsSize2 : number = 0;
        // game.p5.image(this.coinImage, game.p5.width / 2 - game.p5.width / 20 , 0, game.p5.width / 20, game.p5.width / 20)
        // game.p5.image(this.coinImage, game.p5.width / 2 + 1 , 0, game.p5.width / 20, game.p5.width / 20)
        game.p5.fill("wellow");
        game.p5.textSize(game.p5.width / 30);
        coinsSize1 = game.p5.textWidth(this.playerOneCoins.toString());
        // coinsSize2 = game.p5.textWidth(this.playerTwoCoins.toString());
        game.p5.text(this.playerOneCoins.toString(), game.p5.width / 2 - game.p5.width / 20 - coinsSize1 , 12)
        game.p5.text(this.playerTwoCoins.toString(), game.p5.width / 2 + game.p5.width / 20 , 12)
        game.p5.fill("white");
        if (this.isShapeCalc === false)
          this.calcShape(game)
  
  
        if (this.nbrOfCoin)
        {
          let i : number = 0;
  
  
          // console.log('The length is : ' , coins.coordinates.length)
          while (i < this.coordinates.length)
          {
            if (this.moveDirection && this.coordinates[i] !== 0)
            {
              game.p5.fill(255, 50)
              game.p5.stroke('lightgreen')
              game.p5.ellipse(this.coordinates[i] + (game.p5.width / 20 / 2) , this.coordinates[i + 1] +  (game.p5.width / 20 / 2), game.p5.width / 20, game.p5.width / 20)
              game.p5.image(this.coinImage, this.coordinates[i] , this.coordinates[i + 1] , game.p5.width / 20, game.p5.width / 20) 
              
            }
            else if (this.moveDirection === false && this.coordinates[i] !== 0)
            {
  
              game.p5.fill(255, 50)
              game.p5.stroke('yellow')
              game.p5.ellipse(this.coordinates[i] + (game.p5.width / 20 / 2) , this.coordinates[i + 1] +  (game.p5.width / 20 / 2), game.p5.width / 20, game.p5.width / 20)
              game.p5.fill('white')
              game.p5.image(this.coinImage, this.coordinates[i], this.coordinates[i + 1] , game.p5.width / 20, game.p5.width / 20) 
              // if (coins.moveStep % 4)
              //   coins.coordinates[i]--;
            }
            i = i + 2;
          }
        }
        if (this.nbrOfCoin === 0)
        {
          setTimeout(() => {
            this.isShapeCalc = false;
          }, 5000)
        }
        // coins.displayShape = 0
      }
    }

    // end

    ballHitCoins = (game : Game, gameCapsule : GameContainer, ballX : number , ballY : number) =>
    {
        if (this.nbrOfCoin)
        {
          let index : number = 0;
    
          while (index < this.coordinates.length)
          {
            if (this.coordinates[index] === 0)
              index = index + 2
            else
            {
              if (this.coordinates[index] && ballX >= this.coordinates[index] && ballX <= this.coordinates[index] + game.p5.width / 20)
              {
                if (ballY >= this.coordinates[index + 1] && ballY <= this.coordinates[index + 1] + game.p5.width / 20)
                {
                  this.coordinates[index] = 0;
                  this.coordinates[index + 1] = 0;
                  if (gameCapsule.playerNumber === 2)
                  {
                      if (gameCapsule.ball.ballDirection === false)
                        this.playerOneCoins++;
                      else if (gameCapsule.ball.ballDirection === true)
                        this.playerTwoCoins++;
                  }
                  else 
                  {
                      if (gameCapsule.ball.ballDirection === true)
                        this.playerOneCoins++;
                      else if (gameCapsule.ball.ballDirection === false)
                        this.playerTwoCoins++;
                  }
                  this.nbrOfCoin--;
                  // console.log("nbr of coins", this.nbrOfCoin)
                }
              }
              index = index + 2;
            }
          }
        }
    }

}

export default Coins