import './BetterLuck.css'
import UserInfo from './UserInfo';
import { Howl, Howler } from 'howler';

interface BetterProps
{
    playerOne : UserInfo;
    playerTwo : UserInfo;
}

let BetterLuck = ({ playerOne, playerTwo} : BetterProps) =>
{
    let loseSound : any = new Howl({
        src: ['/Sounds/lose.wav'],
        onload: () => {
          console.log('Audio loaded successfully');
          // You can play the sound or perform other actions here
        },
        onloaderror: (error : any ) => {
          console.error('Error loading audio:', error);
        },
      });

    Howler.stop();
    setTimeout(() => {
          loseSound.play();
    }, 1000)

    return (
        <div className='betterContainer'>
            <div className='betterState'>
                <p>Better luck next time!</p>
            </div>
            <div className="betterVs">
                <div className="betterFlashLight"><p>VS</p></div>
            </div>
            <div className='betterCoins'>
                {/* <p>1000 &#128176;</p> */}
            </div>
            <div className='betterPlayer1'>
                <div className='betterPlyInside1'>
                    <p className="betterWinLose">Winner</p>
                    <div className="betterAvatarR1Cover">
                        <div className="betterAvatarR1"></div>
                    </div>
                    <div className='betterPlayerName1'>
                        <p>hunte 111</p>
                    </div>
                    <div className='betterDiposit1'>
                        <p className='nbr1'>1000 &#128176;</p>
                    </div>
                </div>
            </div>
            <div className='betterPlayer2'>
                <div className='betterPlyInside2'>
                    <p className="betterWinLose"> </p>

                    <div className="betterAvatarR2Cover">
                        <div className="betterAvatarR2"></div>
                    </div>
                    <div className='betterPlayerName2'>
                        <p>Machi</p>
                    </div>
                    <div className='betterDiposit2'>
                        <p className='nbr2'>0 &#128176;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BetterLuck;