import './Modes.css'
import { useState , useEffect } from 'react';
import { Socket , io } from 'socket.io-client';

interface KeepTrackProps 
{
    keepTrack : number;
}

let KeepTrack = () =>
{
    let socket : Socket ;
    const serverUrl: string = 'ws://localhost:4055';
    let leave = 0;
    const setUpSocket = () =>
    {
         socket = io(serverUrl, 
         {
             path: '/game-container',
             transports: ['websocket'],
         });
 
         socket.on('connect', () => {
             console.log(`Track Connected to WebSocket server`);
         });
 
         socket.on("aMatchinghappen", () =>
         {
            leave = 1;
         })
         socket.on('disconnect', () => {
             console.log(`Track Disconnected from WebSocket server`);
             console.log("keep Track: =======> ", leave);
             if (leave === 0)
             {
                 console.log("no matching happen", leave)
             }
             else
                 console.log("a matchig happen", leave)
         });
 
         socket.on('connect_error', (error) => {
             console.error('Track connecting to the WebSocket server:');
             });
     }
 
     
     useEffect(() => 
     {
             setUpSocket();
             
             return () => {
             if (socket)
                 {
                     socket.disconnect();
                 }
             };
     }, []);

    return (
        <div className="KeepTrack" ></div>
    )
}
export default KeepTrack;