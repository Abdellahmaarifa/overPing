import "./Modes.css";
import { useState, useEffect } from "react";
import { Socket, io } from "socket.io-client";

interface KeepTrackProps {
  keepTrack: number;
}

let KeepTrack = () => {
  let socket: Socket;
  const serverUrl: string = import.meta.env.OVER_PING_SERVER_URL_PROD_WS;
  let leave = 0;
  const setUpSocket = () => {
    socket = io(serverUrl, {
      path: "/game-container",
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      // console.log(`Track Connected to WebSocket server`);
    });

    socket.on("aMatchinghappen", () => {
      leave = 1;
    });
    socket.on("disconnect", () => {
      // console.log(`Track Disconnected from WebSocket server`);
      // console.log("keep Track: =======> ", leave);
      //  if (leave === 0)
      //  {
      //    //  console.log("no matching happen", leave)
      //  }
      //  else
      //      console.log("a matchig happen", leave)
    });

    socket.on("connect_error", (error) => {
      //   console.error("Track connecting to the WebSocket server:");
    });
    socket.on("connect_timeout", (timeout) => {
      // console.error('Connection to the WebSocket server timed out:', timeout);
    });
    socket.on("error", (error) => {
      //console.log("")
    });
  };

  useEffect(() => {
    setUpSocket();

    return () => {
      if (socket && socket.connected) {
        socket.disconnect();
      }
    };
  }, []);

  return <div className="KeepTrack"></div>;
};
export default KeepTrack;
