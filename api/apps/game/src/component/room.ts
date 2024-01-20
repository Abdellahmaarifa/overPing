import GameContainer from "./gamecontainer";
import { Socket } from "socket.io";

class Rooms 
{
  constructor()
  {
    this.clientOneId = '';
    this.clientTwoId = '';
    this.clientOneSocket = null;
    this.clientTwoSocket = null;
    this.numberOfClients = 0;
  } 

  container : GameContainer = new GameContainer();
  
  clientOneId : string;
  clientTwoId : string;
  clientOneTabId : string;
  clientTwoTabId : string;
  clientOneSocket : Socket;
  clientTwoSocket : Socket;
  clientOneInfoSocket : Socket | null = null;
  clientTwoInfoSocket : Socket | null = null;
  numberOfClients : number;
  getBothRacketData : boolean = false;
  clientTwoWidth : number = 0; 
  matchID : string = "";
  startTime : number = 0;
  late : boolean = false;
  
};

let getRoomByMatchId = (rooms : Rooms[], id : string) : Rooms | undefined  =>
{
  return (rooms.find( (room) => room.matchID === id))
}

function clearRoom(rooms: Rooms[], room: Rooms, client) 
{
  // Clear data or perform cleanup for the room
  //  room.clientOneId = '';
  // room.clientTwoId = '';
  // room.clientOneSocket.disconnect()
  // room.clientTwoSocket.disconnect()
  //room.clientOneSocket = null;
  //room.clientTwoSocket = null;
  room.numberOfClients--;

  // Remove the room from the rooms array
  if (room.numberOfClients === 0)
  {
    const index = rooms.indexOf(room);
    if (index !== -1) 
    {
      rooms.splice(index, 1);
    }
  }
 
}

function getRoomByClientId(rooms : Rooms[] ,clientId: string): Rooms | undefined 
{
  return rooms.find((room) => room.clientOneId === clientId || room.clientTwoId === clientId);
}

function findAvailableRoom(rooms: Rooms[], matchId : string): Rooms | undefined 
{
  let i : number = 0;
  
  while (i < rooms.length)
  {
    if (rooms[i].matchID === matchId)
      return (rooms[i])
    i++;
  }
  return (undefined);
}

function addToRoom(rooms : Rooms[],  client: Socket, matchID : string, tabsId : string) 
{
  // Find or create a room for the client
  let room = findAvailableRoom(rooms, matchID);
  if (!room) 
  {
    room = new Rooms();
    rooms.push(room);
    room.matchID = matchID
  }

  // Assign the client to the room
  if (matchID.length && matchID.substring(0, 5) === 'robot')
  {
    room.clientOneId = client.id;
    room.clientOneTabId = tabsId;
    room.clientOneSocket = client;
    room.numberOfClients = 3

  }
  else if (room.numberOfClients === 0) 
  {
    room.clientOneId = client.id;
    room.clientOneTabId = tabsId;
    room.clientOneSocket = client;
    room.numberOfClients = 1;
    room.startTime = Date.now();
  } 
  else if (room.numberOfClients === 1) 
  {
    room.clientTwoId = client.id;
    room.clientTwoTabId = tabsId;
    room.clientTwoSocket = client;
    room.numberOfClients = 2;

    // Start the game or perform any other necessary actions
    //this.startGame(room);
  }
};

let checkIfGameNotOver = (room : Rooms, client : Socket) : null | Socket =>
{
  if (room.container.leftPlayerGoal === 5 || room.container.rightPlayerGoal === 5)
    return (null);
  if (client === room.clientOneSocket)
    return (room.clientTwoSocket)
  else
   return (room.clientOneSocket);
}

let addInfoSocketToRoom = (rooms: Rooms[], client : Socket, matchId : string) : void=>
{
  setTimeout(() => {}, 1000);
  let room : Rooms | undefined = rooms.find( (room) => room.matchID = matchId)
  if (room)
  {
    if (room.clientOneInfoSocket !== null)
      room.clientOneInfoSocket = client;
    else
      room.clientTwoInfoSocket = client;
  }
}

let getRoomByClientInfoSocket = (rooms : Rooms [], client : Socket) : Rooms | undefined =>
{
  let room : Rooms = rooms.find( (rom) => rom.clientOneInfoSocket === client || rom.clientTwoInfoSocket === client)
  
  return (room);
}

export default Rooms;
export { getRoomByMatchId, clearRoom, getRoomByClientId, findAvailableRoom, addToRoom , checkIfGameNotOver, addInfoSocketToRoom, getRoomByClientInfoSocket}