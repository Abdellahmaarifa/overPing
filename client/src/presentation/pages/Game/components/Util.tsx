import './Util.css'
import UserInfo from './UserInfo';
import { useState } from 'react';
import { Howl, Howler } from 'howler';

Howler.volume(1.0);
interface UtilProps 
{
    playerOne: UserInfo;
    updateUserInfoUtil: (newUtil: number) => void;
}

let Util = ({ playerOne , updateUserInfoUtil} : UtilProps ) =>
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


    // function forcePortrait() 
    // {
    //   if (typeof window.screen !== 'undefined')
    //   {
    //     console.log("defined screen")
    //     if (window.screen.orientation)
    //     {
    //       window.screen.orientation.lock('portrait');
    //     }
    //   }
    //   else console.log("undefined val")
    // }
    // setTimeout(() => {

    //     //window.addEventListener('load', forcePortrait);
    //     //forcePortrait()
    // }, 100)

    const [Util, setUtil] = useState(0)
    
    let validateData = (Util : number) : undefined =>
    {
        if (Util !== 0)
        {
            updateUserInfoUtil(Util);
        }

        return (undefined)
    }

    return (
        <div className="UtilContainer" >
            <div className="UtilTitle"><p>Choose Util!</p></div>
            <div className="UtilHint">
                <p>Select the util you want to play with!</p>
            </div>
            <div className="Utils">
                <div className="UtilContainers" >
                    <div className={`util1 ${Util === 1 ? "hoverUtil1" : ""}`} onClick={ () => { selectSound.play(); setUtil(1)}}>
                        <div className='UtilImg U1'></div>
                        <div className='UtilName' ><p>Mouse</p></div>
                    </div>
                    <div className={`util2 ${Util === 2 ? "hoverUtil2" : ""}`} onClick={ () =>{ selectSound.play(); setUtil(2)}}>
                        <div className='UtilImg U2'></div>
                        <div className='UtilName'><p>Keyboard</p></div>
                    </div>
                </div>
            </div>
            <div className='UntilConfirm'>
                <button onClick={ () => validateData(Util) }>Confirm</button>
            </div>
        </div>
    )
};

export default Util;