import UserInfo from "./UserInfo";
import { Socket } from "socket.io";


interface PlayersList
{
    playersInfo   : UserInfo;
}



let isAlreadyWaiting = (waitingPlayers : PlayersList[], userId : number) : boolean =>
{
    let i : number = 0;
    while (i < waitingPlayers.length)
    {
        if (waitingPlayers[i].playersInfo.userId ===  userId)
            return (true);
        i++;
    }
    return (false)
};

let addPlayerToWaitingList = (waitingPlayers: PlayersList[], playerObject : UserInfo) : void => 
{
    
    let newPlayer : PlayersList  =
    {
        playersInfo : playerObject,
    } 
    waitingPlayers.push(newPlayer);
}

let removePlayerFromWaitingList = (waitingPlayers: PlayersList[], userId : number) : PlayersList[] => 
{
    let tmpList : PlayersList[] = [];
    let i : number = 0;

    // console.log("before remove the length is ", waitingPlayers.length)
    while (i < waitingPlayers.length)
    {
        if (waitingPlayers[i].playersInfo.userId !== userId)
        {
            tmpList.push(waitingPlayers[i]);
        }
        i++;
    }
    waitingPlayers = tmpList;
    // console.log("after remove the length is ", waitingPlayers.length)
    return (waitingPlayers);
}

let findMatchigPlayer = (waitingPlayers : PlayersList[], player : UserInfo) : PlayersList | undefined =>
{
    let found : PlayersList | undefined = undefined;
    
    found = waitingPlayers.find( (ply) => 
    ply.playersInfo.userId !== player.userId && ply.playersInfo.matchWager === player.matchWager && ply.playersInfo.modePlaying === player.modePlaying )
    if (found === undefined)
    {
        setTimeout(() =>{
            found = waitingPlayers.find( (ply) => 
            ply.playersInfo.userId !== player.userId && ply.playersInfo.matchWager === player.matchWager && ply.playersInfo.modePlaying === player.modePlaying )
        }, 30000);
        if (found === undefined)
        {
            setTimeout(() =>{
                found = waitingPlayers.find( (ply) => 
                ply.playersInfo.userId !== player.userId && ply.playersInfo.matchWager === player.matchWager && ply.playersInfo.modePlaying === player.modePlaying )
            }, 30000);
        }
    }
    if (found !== undefined)
        return (found);
    else
        return (undefined)
}

let updatePlayerObject = (waitingPlayers: PlayersList [] , player : UserInfo) : UserInfo | undefined =>
{
    let findPlayer : PlayersList | undefined = waitingPlayers.find( (ply) => 
    {
        if (ply.playersInfo.tabId === player.tabId)
            ply.playersInfo = player;
    }
    );
    if (findPlayer !== undefined)
        return (findPlayer.playersInfo)
    else
        return (undefined);
}

export { isAlreadyWaiting, addPlayerToWaitingList, removePlayerFromWaitingList , findMatchigPlayer, updatePlayerObject};