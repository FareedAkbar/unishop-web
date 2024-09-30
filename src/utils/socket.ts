import { io, Socket } from "socket.io-client";

const socket: Socket = io("https://api.iconsole.com.au", {
    autoConnect: true,
    transports: ["websocket"],
}); // Replace with your server URL




export default socket;