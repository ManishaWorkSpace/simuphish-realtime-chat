import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ["websocket"],

      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,

      autoConnect: true,
    });
  }

  return socket;
};
