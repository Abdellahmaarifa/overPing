import './Deposit.css'
import UserInfo from './UserInfo';
import { useState } from 'react';
import { Howl, Howler } from 'howler';

Howler.volume(1.0);
interface ModesProps 
{
    playerOne: UserInfo;
    updateUserInfoWager: (newWager: number) => void;
}

let Deposite = ( { playerOne , updateUserInfoWager} : ModesProps  ) =>
{
    let selectSound : any = new Howl({
        src: ['/Sounds/click-menu.mp3'],
        onload: () => {
          console.log('Audio loaded successfully');
          // You can play the sound or perform other actions here
        },
        onloaderror: (error : any) => {
          console.error('Error loading audio:', error);
        },
      });
    
    let [Wager, setWager] = useState(0);

    let validateWager = (Wager : number) =>
    {
        if (Wager !== 0)
        {
            updateUserInfoWager(Wager);
        }
    }


    return (
        <div className="DepositContainer">
            <div className="DepositTitle"><p>Make a wager!</p></div>
            <div className="DepositHint">
                <p>The prize will be 2x the coin of the player with the smallest wager!</p>
            </div>
            <div className="Deposits">
                <div className={`wagers ${Wager ===  50 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(50)}} ><p>50k &#128176;</p></div>
                <div className={`wagers ${Wager === 100 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(100)}} ><p>100k &#128176;</p></div>
                <div className={`wagers ${Wager === 200 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(200)}} ><p>200k &#128176;</p></div>
                <div className={`wagers ${Wager === 300 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(300)}} ><p>300k &#128176;</p></div>
                <div className={`wagers ${Wager === 400 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(400)}} ><p>400k &#128176;</p></div>
                <div className={`wagers ${Wager === 500 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(500)}} ><p>500k &#128176;</p></div>
                <div className={`wagers ${Wager === 600 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(600)}} ><p>600k &#128176;</p></div>
                <div className={`wagers ${Wager === 700 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(700)}} ><p>700k &#128176;</p></div>
                <div className={`wagers ${Wager === 800 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(800)}} ><p>800k &#128176;</p></div>
                <div className={`wagers ${Wager === 900 ? "hoverWager" : ""} `} onClick={ () =>{ selectSound.play(); setWager(900)}} ><p>900k &#128176;</p></div>
            </div>`
            <div className="DepositHint">
                <p>Prize: double your wager</p>
            </div>
            <div className='DepositConfirm'>
                <button onClick={ () => validateWager(Wager)}>Confirm</button>
            </div>
        </div>
    )
};

export default Deposite;
