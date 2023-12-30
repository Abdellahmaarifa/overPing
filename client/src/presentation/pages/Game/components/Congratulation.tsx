import './Congratulation.css'
import UserInfo from './UserInfo'
import { Howl, Howler } from 'howler';

Howler.volume(1.0);
interface CongraProps
{
    playerOne : UserInfo;
    playerTwo : UserInfo;
}

let Congratulation = ({playerOne, playerTwo} : CongraProps) =>
{
    let winSound : any = new Howl({
        src: ['/Sounds/win.wav'],
        onload: () => {
          console.log('Audio loaded successfully');
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
                        <div className="congAvatarR1"></div>
                    </div>
                    <div className='congPlayerName1'>
                        <p>hunte 111</p>
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
                        <div className="congAvatarR2"></div>
                    </div>
                    <div className='congPlayerName2'>
                        <p>Machi</p>
                    </div>
                    <div className='congDiposit2'>
                        <p className='nbr2'>1000 &#128176;</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Congratulation;