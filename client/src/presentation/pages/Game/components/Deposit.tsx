import './Deposit.css'
import UserInfo from './UserInfo';
import { useState } from 'react';
import { useJoinMatchGameMutation } from 'gql/index';
import { useEffect } from 'react';

interface ModesProps 
{
    playerOne: UserInfo;
    updateUserInfoWager: (newWager: number) => void;
}

let Deposite =  ( { playerOne , updateUserInfoWager} : ModesProps  ) =>
{
    
    let [Wager, setWager] = useState(0);

    let validateWager =  (Wager : number) =>
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
                <div className={`wagers ${Wager === 100 ? "hoverWager" : ""} `} onClick={ () =>{  setWager(100)}} ><p>100 &#128176;</p></div>
                <div className={`wagers ${Wager === 500 ? "hoverWager" : ""} `} onClick={ () =>{  setWager(500)}} ><p>500 &#128176;</p></div>
                <div className={`wagers ${Wager === 1000 ? "hoverWager" : ""} `} onClick={ () =>{ setWager(1000)}} ><p>1k &#128176;</p></div>
                <div className={`wagers ${Wager === 2500 ? "hoverWager" : ""} `} onClick={ () =>{ setWager(2500)}} ><p>2.5k &#128176;</p></div>
                <div className={`wagers ${Wager === 5000 ? "hoverWager" : ""} `} onClick={ () =>{ setWager(5000)}} ><p>5k &#128176;</p></div>
                <div className={`wagers ${Wager === 10000 ? "hoverWager" : ""} `} onClick={ () =>{ setWager(10000)}} ><p>10k &#128176;</p></div>
                <div className={`wagers ${Wager === 25000 ? "hoverWager" : ""} `} onClick={ () =>{ setWager(25000)}} ><p>25k &#128176;</p></div>
                <div className={`wagers ${Wager === 50000 ? "hoverWager" : ""} `} onClick={ () =>{ setWager(50000)}} ><p>50k &#128176;</p></div>
                <div className={`wagers ${Wager === 100000 ? "hoverWager" : ""} `} onClick={ () =>{ setWager(100000)}} ><p>100k &#128176;</p></div>
                <div className={`wagers ${Wager === 200000 ? "hoverWager" : ""} `} onClick={ () =>{ setWager(200000)}} ><p>200k &#128176;</p></div>
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
