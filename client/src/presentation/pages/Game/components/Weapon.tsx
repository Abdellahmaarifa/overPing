import p5Types from 'p5'
import Game from './gameInstance'
import PlayerWeapon from './PlayerWeapon'
import { Sounds } from './mySketch';
import GameContainer from './gamecontainer';


class Weapon
{
    alertImage : p5Types.Element | p5Types.Image | p5Types.Framebuffer | null = null;
    heartImage : p5Types.Element | p5Types.Image | p5Types.Framebuffer  | null = null;
    prizeImage : p5Types.Element | p5Types.Image | p5Types.Framebuffer | null = null;
    weaponImages :  p5Types.Element [] | p5Types.Image [] | p5Types.Framebuffer [] | null = [];
    alertDirection : boolean = true;
    alertY      : number = 0;
    ballHitAlert: boolean = false;
    ballDirectionOnhit : boolean | undefined = undefined;
    plyOne : PlayerWeapon = new PlayerWeapon();
    plyTwo : PlayerWeapon = new PlayerWeapon()
    switch : boolean = false;
    weaponIndex : number = -1;
    getIndex : boolean = false;

    loadImages = (game : Game) =>
    {
        if (this.weaponImages)
        {
            this.alertImage = game.p5.loadImage("./animationImages/crosshair.png")
            this.heartImage = game.p5.loadImage("./animationImages/heart.png")
            this.prizeImage = game.p5.loadImage("./animationImages/prizeBox.jpeg")
            this.weaponImages[0] = game.p5.loadImage("./animationImages/heart.png")
            this.weaponImages[1] = game.p5.loadImage("./animationImages/freeze.png")
            this.weaponImages[2] = game.p5.loadImage("./animationImages/rocket.png")
            this.weaponImages[3] = game.p5.loadImage("./animationImages/leftRocket.png")
            this.weaponImages[4] = game.p5.loadImage("./animationImages/rightRocket.png")
            this.weaponImages[5] = game.p5.loadImage("./animationImages/rightRocketExplosion.png")
            this.weaponImages[6] = game.p5.loadImage("./animationImages/rocketExplosion.png")
        }
    }

    displayAlert = (game : Game) => 
    {
        if (this.ballHitAlert === false)
        {
            if (this.alertDirection)
                this.alertY += 1;
            else
                this.alertY -= 1;
            if (this.alertY + game.p5.width / 20 >= game.p5.height)
                this.alertDirection = false;
            if (this.alertY <= 0)
                this.alertDirection = true;
            if (this.alertImage)
                game.p5.image(this.alertImage, game.p5.width / 2 - game.p5.width / 40, this.alertY, game.p5.width / 20, game.p5.width / 20 )
        }
    }

    isBallHitTheAlert = (ballX : number , ballY : number , ballDirection : boolean | undefined, game : Game, playerNumber : number) =>
    {
        if (this.ballHitAlert === false && ballDirection !== undefined)
        {
            if (ballX >= game.p5.width / 2 - game.p5.width / 40 && ballX <= game.p5.width / 2 + game.p5.width / 40)
            {
                if (ballY >= this.alertY && ballY < this.alertY + game.p5.width / 20)
                {
                    Sounds.alertHitSound.play();
                    if (ballDirection !== undefined /* && ball.first50hit */)
                        this.ballHitAlert = true;
                    this.ballDirectionOnhit = ballDirection;
                    if (playerNumber === 2)
                        this.ballDirectionOnhit = !this.ballDirectionOnhit
                    if (this.ballDirectionOnhit === false)
                    {
                        this.ballDirectionOnhit = false;
                        // this.plyOne.randomAction();
                    }
                    else if (this.ballDirectionOnhit === true)
                    {
                        this.ballDirectionOnhit = true;
                        // this.plyTwo.randomAction();
                    }
                }
            }
        }
    }

    displayPrize = (game : Game, playerNumber : number) => 
    {
        if ((this.prizeImage) && (this.ballDirectionOnhit === false || this.ballDirectionOnhit === undefined))
            game.p5.image(this.prizeImage, game.p5.width / 2 - game.p5.width / 20  - game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )  
        if ((this.prizeImage) && (this.ballDirectionOnhit === true || this.ballDirectionOnhit === undefined))
            game.p5.image(this.prizeImage, game.p5.width / 2 + game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )
    }

    displayHearts = (plyOneHearts : number, plyTwoHearts: number, game: Game) =>
    {
        if (this.heartImage)
        {
            if (plyOneHearts >= 1)
                game.p5.image(this.heartImage, game.p5.width - game.p5.width / 20 , 0, game.p5.width / 20, game.p5.width / 20 ) 
            if (plyOneHearts >= 2)
                game.p5.image(this.heartImage, game.p5.width - game.p5.width / 20 * 2, 0, game.p5.width / 20, game.p5.width / 20 ) 
            if (plyOneHearts >= 3)
                game.p5.image(this.heartImage, game.p5.width - game.p5.width / 20 * 3, 0, game.p5.width / 20, game.p5.width / 20 ) 
            if (plyTwoHearts >= 1)
                game.p5.image(this.heartImage, 0, 0, game.p5.width / 20, game.p5.width / 20 ) 
            if (plyTwoHearts >= 2)
                 game.p5.image(this.heartImage, game.p5.width / 20, 0, game.p5.width / 20, game.p5.width / 20 ) 
            if (plyTwoHearts >= 3)
                game.p5.image(this.heartImage, game.p5.width / 20 * 2, 0, game.p5.width / 20, game.p5.width / 20 ) 
        }
    }

    switchImage = (player : boolean) =>
    {
        Sounds.switchSound.play()
        if (player === false)
        {
            this.plyOne.random++;
            if (this.plyOne.random === 3)
                this.plyOne.random = 0;
        }
        else if (player === true)
        {
            this.plyTwo.random++;
            if (this.plyTwo.random === 3)
                this.plyTwo.random = 0;
        }
    }

    choseWeapon = (game : Game, playerNumber : number, ballDirection : boolean) =>
    {
        if (this.ballHitAlert)
        {
            // this.ballDirectionOnhit = ballDirection;
            // if (playerNumber === 2)
                // this.ballDirectionOnhit = !ballDirection
            if (this.ballDirectionOnhit === false)
            {
                if (this.weaponImages && this.plyOne.displayWeaponImg === false)
                    game.p5.image(this.weaponImages[this.plyOne.random], game.p5.width / 2 + game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )
                if (this.switch === false)
                {
                    const intervalId = setInterval(() => this.switchImage(false), 500)
                    
                    setTimeout(() => {
                    clearInterval(intervalId);
                    this.plyOne.displayWeaponImg = true;
                    this.plyOne.setTime = true;
                    }, 5000)

                    this.switch = true;
                }
            }
            else if (this.ballDirectionOnhit === true)
            {
                if (this.weaponImages && this.plyTwo.displayWeaponImg === false)
                    game.p5.image(this.weaponImages[this.plyTwo.random], game.p5.width / 2 - game.p5.width / 20  - game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )  
                
                if (this.switch === false)
                {
                    const intervalId = setInterval(() => this.switchImage(true), 500)
                    
                    setTimeout(() => {
                    clearInterval(intervalId);
                    this.plyTwo.displayWeaponImg = true;
                    this.plyTwo.setTime = true;
                    }, 5000)

                    this.switch = true;
                }
            }
        }
    }

    heartAction = (game : Game) =>
    {
        if (this.plyOne.WeaponIndex === 0 && this.weaponImages)
        {
            game.p5.image(this.weaponImages[this.plyOne.WeaponIndex], game.p5.width / 2 + game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )
            if (this.plyOne.setTime === true)
            {
                setTimeout(() => {
                if (this.plyOne.playerHearts < 3)
                    Sounds.heartSound.play();
                this.plyOne.playerHearts++;
                if (this.plyOne.playerHearts > 3)
                    this.plyOne.playerHearts = 3;
                this.ballHitAlert = false;
                this.ballDirectionOnhit = undefined;
                this.switch = false;
                this.plyOne.displayWeaponImg = false;
                this.plyOne.random = 0;
                this.plyOne.WeaponIndex = -1;
                this.plyTwo.WeaponIndex = -1;
                this.getIndex = false;
                }, 2000)
                this.plyOne.setTime = false;
            }
        }
        if (this.plyTwo.WeaponIndex === 0 && this.weaponImages)
        {
            game.p5.image(this.weaponImages[this.plyTwo.WeaponIndex], game.p5.width / 2 - game.p5.width / 20  - game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )  
            if (this.plyTwo.setTime === true)
            {
                setTimeout(() => {
                if (this.plyTwo.playerHearts < 3)
                    Sounds.heartSound.play();
                this.plyTwo.playerHearts++;
                if (this.plyTwo.playerHearts > 3)
                    this.plyTwo.playerHearts = 3;
                this.ballHitAlert = false;
                this.ballDirectionOnhit = undefined;
                this.switch = false;
                this.plyTwo.displayWeaponImg = false;
                this.plyTwo.random = 0;
                this.plyOne.WeaponIndex = -1;
                this.plyTwo.WeaponIndex = -1;
                this.getIndex = false;
                }, 2000)
                this.plyTwo.setTime = false;
            }
        }
    }
    
    freezeAction = (game : Game) =>
    {
        if (this.plyOne.WeaponIndex === 1 && this.weaponImages)
        {
            game.p5.image(this.weaponImages[this.plyOne.WeaponIndex], game.p5.width / 2 + game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )
            if (this.plyOne.setTime === true)
            {
                game.rightRacket.racketFreezed = true
                setTimeout(() => {
                    Sounds.freezeSound.play();
                }, 200)
                setTimeout(() => {
                    Sounds.freezeSound.play();
                    game.rightRacket.racketFreezed = false;
                    this.ballHitAlert = false;
                    this.ballDirectionOnhit = undefined;
                    this.switch = false;
                    this.plyOne.displayWeaponImg = false;
                    this.plyOne.random = 0;
                    this.plyOne.WeaponIndex = -1;
                    this.plyTwo.WeaponIndex = -1;
                    this.getIndex = false;
                    }, 5000)
                this.plyOne.setTime = false; 
            }
        }
        if (this.plyTwo.WeaponIndex === 1 && this.weaponImages)
        {
            game.p5.image(this.weaponImages[this.plyTwo.WeaponIndex], game.p5.width / 2 - game.p5.width / 20  - game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )  
            if (this.plyTwo.setTime === true)
            {
                game.leftRacket.racketFreezed = true;
                setTimeout(() => {
                    Sounds.freezeSound.play();
                }, 200)
                setTimeout(() => {
                    Sounds.freezeSound.play();
                    game.leftRacket.racketFreezed = false;
                    this.ballHitAlert = false;
                    this.ballDirectionOnhit = undefined;
                    this.switch = false;
                    this.plyTwo.displayWeaponImg = false;
                    this.plyTwo.random = 0;
                    this.plyOne.WeaponIndex = -1;
                    this.plyTwo.WeaponIndex = -1;
                    this.getIndex = false;
                    }, 5000)
                this.plyTwo.setTime = false;
            }
        }
    }   
    rocketAction = (game: Game, gameCapsule : GameContainer) =>
    {
        if (this.plyOne.WeaponIndex === 2 && this.weaponImages)
        {
            game.p5.image(this.weaponImages[this.plyOne.WeaponIndex], game.p5.width / 2 + game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )
            game.p5.image(this.weaponImages[3], (game.p5.width - game.p5.width / 20) - this.plyOne.rocketXMove, game.p5.height / 2 - game.p5.width / 40, game.p5.width / 20, game.p5.width / 20)
            this.plyOne.rocketXMove += game.p5.width / 400;
            if (this.plyOne.setTime === true)
            {
                Sounds.rocketLanding.play()
            }
            this.plyOne.setTime = false;
            // if (this.plyOne.setTime === true)
            
            if (this.plyOne.rocketXMove >= game.p5.width - game.p5.width / 20 - 50)
            {
                if (this.plyOne.explosionSound === true)
                    Sounds.rocketWhoosh.play();
                this.plyOne.explosionSound = false;
            }
            if (this.plyOne.rocketXMove >= game.p5.width - game.p5.width / 20 - 10)
                 game.p5.image(this.weaponImages[5], (game.p5.width - game.p5.width / 20) - this.plyOne.rocketXMove, game.p5.height / 2 - game.p5.width / 40, game.p5.width / 20, game.p5.width / 20)
            if (this.plyOne.rocketXMove >= game.p5.width - game.p5.width / 20)
            {
                // setTimeout(() => {
                    Sounds.rocketLanding.stop()
                    this.ballHitAlert = false;
                    this.ballDirectionOnhit = undefined;
                    this.switch = false;
                    this.plyOne.displayWeaponImg = false;
                    this.plyOne.random = 0;
                    this.plyOne.WeaponIndex = -1;
                    this.plyTwo.WeaponIndex = -1;
                    this.plyOne.rocketXMove = 0;
                    this.plyTwo.playerHearts--;
                    this.plyOne.explosionSound = true;
                    this.getIndex = false;
                    setTimeout(() => {
                        Sounds.rocketWhoosh.stop()
                     }, 2500)
                    // }, 5000)
                // this.plyOne.setTime = false; 
            }
            
        }
        if (this.plyTwo.WeaponIndex === 2 && this.weaponImages)
        {
            game.p5.image(this.weaponImages[this.plyTwo.WeaponIndex], game.p5.width / 2 - game.p5.width / 20  - game.p5.width / 40, 0, game.p5.width / 20, game.p5.width / 20 )  
            game.p5.image(this.weaponImages[4], 0 + this.plyTwo.rocketXMove, game.p5.height / 2 - game.p5.width / 40, game.p5.width / 20, game.p5.width / 20)
            this.plyTwo.rocketXMove += game.p5.width / 400;
            if (this.plyTwo.setTime === true)
                Sounds.rocketLanding.play()
            this.plyTwo.setTime = false;
            
            if (this.plyTwo.rocketXMove >= game.p5.width - game.p5.width / 20 - 50)
            {
                if (this.plyTwo.explosionSound === true)
                    Sounds.rocketWhoosh.play()
                this.plyTwo.explosionSound = false;
            } 
            if (this.plyTwo.rocketXMove >= game.p5.width - game.p5.width / 20 - 10)
                game.p5.image(this.weaponImages[6], 0 + this.plyTwo.rocketXMove, game.p5.height / 2 - game.p5.width / 40, game.p5.width / 20, game.p5.width / 20)

            if (this.plyTwo.rocketXMove >= game.p5.width - game.p5.width / 20)
            {

                // setTimeout(() => {
                    Sounds.rocketLanding.stop()
                    this.ballHitAlert = false;
                    this.ballDirectionOnhit = undefined;
                    this.switch = false;
                    this.plyTwo.displayWeaponImg = false;
                    this.plyTwo.random = 0;
                    this.plyOne.WeaponIndex = -1;
                    this.plyTwo.WeaponIndex = -1;
                    this.plyTwo.rocketXMove = 0;
                    this.plyOne.playerHearts--;
                    this.plyTwo.explosionSound = true;
                    this.getIndex = false;
                    setTimeout(() => {
                        Sounds.rocketWhoosh.stop()
                     }, 2500)
                    // }, 5000)
                // this.plyTwo.setTime = false;
            }
        }
    }
}

export default Weapon;
