import UserInfo from "./UserInfo";
import { Socket } from "socket.io";


interface PlayersList
{
    playersInfo   : UserInfo;
    playersSocket : Socket;
}



let isAlreadyWaiting = (waitingPlayers : PlayersList[], tabId : string) : boolean =>
{
    let i : number = 0;
    while (i < waitingPlayers.length)
    {
        if (waitingPlayers[i].playersInfo.tabId === tabId)
            return (true);
        i++;
    }
    return (false)
};

let addPlayerToWaitingList = (waitingPlayers: PlayersList[], tabId : string, client: Socket) : void => 
{
    
    let newPlayer : PlayersList  =
    {
        playersInfo : new UserInfo("", "", 0, 0, "", "", "", 0, 0, 0, 0, 0, 0),
        playersSocket : client
    } 
    newPlayer.playersInfo.tabId = tabId;
    waitingPlayers.push(newPlayer);
}

let removePlayerFromWaitingList = (waitingPlayers: PlayersList[], client : Socket) : PlayersList[] => 
{
    let tmpList : PlayersList[] = [];
    let i : number = 0;

    // console.log("before remove the length is ", waitingPlayers.length)
    while (i < waitingPlayers.length)
    {
        if (waitingPlayers[i].playersSocket !== client)
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
    
    found = waitingPlayers.find( (ply) => ply.playersInfo.tabId !== player.tabId && ply.playersInfo.matchWager === player.matchWager && ply.playersInfo.modePlaying === player.modePlaying )
    if (found === undefined)
    {
        found = waitingPlayers.find( (ply) => ply.playersInfo.tabId !== player.tabId && ply.playersInfo.matchWager === player.matchWager)
        if (found === undefined)
        {
            found = waitingPlayers.find( (ply) => ply.playersInfo.tabId !== player.tabId && ply.playersInfo.modePlaying === player.modePlaying) 
            if (found === undefined)
                found = waitingPlayers.find( (ply) => ply.playersInfo.tabId !== player.tabId);
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