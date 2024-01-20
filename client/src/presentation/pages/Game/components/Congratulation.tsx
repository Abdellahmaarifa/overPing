import './Congratulation.css'
import UserInfo from './UserInfo'
import { Howl, Howler } from 'howler';
import { io, Socket } from 'socket.io-client';
import { IGameData } from './game.interface';
import { Result } from './Result';
import { Achieve, MatchMode } from './Achieve';
const serverUrl: string = 'ws://localhost:4055';
import { useEffect } from 'react'; 
import { fa } from '@faker-js/faker';

export class MatchResultDto {
  }

Howler.volume(1.0);
interface CongraProps
{
    playerOne : UserInfo;
    playerTwo : UserInfo;
    gameResult : Result;

}

let Congratulation = ({playerOne, playerTwo, gameResult} : CongraProps) =>
{
    let plyOneImg : HTMLElement | null = null;
    let plyTwoImg : HTMLElement | null = null;
    let socket: Socket | null = null;
    let winSound : any = new Howl({
        src: ['/Sounds/win.wav'],
        onload: () => {
         // console.log('Audio loaded successfully');
          // You can play the sound or perform other actions here
        },
        onloaderror: (error : any) => {
          console.error('Error loading audio:', error);
        },
      });
    
    Howler.stop();
    setTimeout(() => {
        winSound.play();
    }, 1000)

    setTimeout( () => {
        plyOneImg  = document.getElementById("congAvatar2");
        plyTwoImg  = document.getElementById("congAvatar1");
        plyOneImg?.setAttribute('src', playerOne.userAvatar);
        plyTwoImg?.setAttribute('src', playerTwo.userAvatar);
        // else

    }, 200)

    let plyOneGoals : number  = 0;
    let plyTwoGoals : number  = 0;
    let prise : number = playerOne.matchWager * 2;
    if (playerOne.userId = gameResult.plyOneId)
    {
        plyOneGoals = gameResult.plyOneGoals;
        plyTwoGoals = gameResult.plyTwoGoals;
    }
    else
    {
        plyTwoGoals = gameResult.plyOneGoals;
        plyOneGoals = gameResult.plyTwoGoals;
    }
    const gameData : IGameData = 
    {
        playerOneId       : playerOne.userId,
        playerOneName     : playerOne.userName,
        playerOneImageURL : playerOne.userAvatar,
        playerOneScore    : plyOneGoals,
        playerOneStatus   : 1,
        playerTwoId       : playerTwo.userId,
        playerTwoName     : playerTwo.userName,
        playerTwoImageURL : playerTwo.userAvatar,
        playerTwoScore    : plyTwoGoals,
        playerTwoStatus   : 0,
        points            : prise,
        level             : 60,
      };
    
      /*
      export class IGameData {
    playerOneId:       number
    playerOneName:     string
    playerOneImageURL: string
    playerOneScore:    number
    playerOneStatus:   number
    playerTwoId:       number
    playerTwoName:     string
    playerTwoImageURL: string
    playerTwoScore:    number
    playerTwoStatus:   number
    points:            number
    level:             number
};

      */
    //   prismaService.createGame(gameData)
    //   .then((createdGame) => {
    //     console.log('Game result inserted into the database:', createdGame);
    //   })
    //   .catch((error) => {
    //     console.error('Error inserting game result into the database:', error);
    //   });








      socket = io(serverUrl, { path: '/game-container'
      , transports: ['websocket']});
  
      socket.on('connect', () => {
        //console.log(`App Connected to WebSocket server in tab id `);
      });
  
      socket.on('disconnect', () => {
        //console.log(`App Disconnected from WebSocket server in tab `);
      });
  
      
      //      console.log("Users: -----> ", playerOne, playerTwo);
      
      
      useEffect(() => {

          const player1 : Achieve = {
            user_id: 2,
            score_for: 0,
            score_against: 4,
            is_winner:  false,
            bet: 0,
            matchMode: MatchMode.TOURNAMENT,
            strict_shot_goals:  2,
            rebounded_goals: 3,
            starts_collected: 0,
          };
    
          const player2 : Achieve = {
            user_id: 3,
            score_for: 5,
            score_against: 2,
            is_winner:  true,
            bet: 400000,
            matchMode: MatchMode.TOURNAMENT,
            strict_shot_goals:  2,
            rebounded_goals: 2,
            starts_collected: 0,
          };
    
          socket?.emit('customAchieve', { player1, player2 });
      }, [])
      ///
      //
      //





    let wager : number = playerOne.matchWager * 2;
    return (
        <div className='congcontainer'>
            <div className='congState'>
                <p>Congratulation!</p>
            </div>
            <div className="congvs">
                <div className="congFlashLight"><p>VS</p></div>
                {/* <p>VS</p> */}
            </div>
            <div className='congcoins'>
                {/* <p>1000 &#128176;</p> */}
            </div>
            <div className='congPlayer1'>
                <div className='congPlyInside1'>
                    <p className="winLose"> </p>
                    <div className="congAvatarR1Cover">
                        <div className="congAvatarR1"><img id="congAvatar1" src="question-mark.jpeg" alt="avatar"/></div>
                    </div>
                    <div className='congPlayerName1'>
                        <p>{playerTwo.userName}</p>
                    </div>
                    <div className='congDiposit1'>
                        <p className='nbr1'>0 &#128176;</p>
                    </div>
                </div>
            </div>
            <div className='congPlayer2'>
                <div className='congPlyInside2'>
                    <p className="winLose">Winner</p>
                    <div className="congAvatarR2Cover">
                        <div className="congAvatarR2"><img id="congAvatar2" src="question-mark.jpeg" alt="avatar"/></div>
                    </div>
                    <div className='congPlayerName2'>
                        <p>{playerOne.userName}</p>
                    </div>
                    <div className='congDiposit2'>
                        <p className='nbr2'>{wager} &#128176;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Congratulation;