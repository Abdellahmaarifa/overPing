import './Modes.css'
import UserInfo from './UserInfo';
import { useState } from 'react';

interface ModesProps 
{
    playerOne: UserInfo;
    updateUserInfoMode: (newMode: number) => void;
}

let Modes = ({ playerOne , updateUserInfoMode} : ModesProps ) =>
{
    const [Mode, setMode] = useState(0)
    
    let validateData = (Mode : number) : undefined =>
    {
        if (Mode !== 0)
        {
            updateUserInfoMode(Mode);
        }

        return (undefined)
    }

    return (
        <div className="ModeContainer" >
        <div className="ModeTitle"><p>Choose the Mode!</p></div>
        <div className="ModeHint">
            <p>Select the mode you want and triumph over your opponents!</p>
        </div>
        <div className="Modes">
            <div className="ModeSubContainer" >
                <div className={`mode1 ${Mode === 1 ? "hoverMode1" : ""}`} onClick={ () => { setMode(1)}}>
                    <div className='ModeImg i1'></div>
                    <div className='modeName' ><p>Classic</p></div>
                </div>
                <div className={`mode2 ${Mode === 2 ? "hoverMode2" : ""}`} onClick={ () => {  setMode(2)}}>
                    <div className='ModeImg i2'></div>
                    <div className='modeName'><p>Sandstorm</p></div>
                </div>
                <div className={`mode3 ${Mode === 3 ? "hoverMode3" : ""}`} onClick={ () => { setMode(3)}}>
                    <div className='ModeImg i3'></div>
                    <div className='modeName'><p>LastPong</p></div>
                </div>
            </div>
        </div>
        <div className='ModeConfirm'>
            <button onClick={ () => validateData(Mode) }>Confirm</button>
        </div>
    </div>
    )
};

export default Modes;
