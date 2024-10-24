import { io, Socket } from "socket.io-client";
// https://ipos-dev.iconsole.com.au
// https://ipi.iconsole.com.au
// http://110.93.226.167:3001
const socket: Socket = io("http://110.93.226.167:3001", {
    autoConnect: true,
    transports: ["websocket"],
}); // Replace with your server URL


export default socket;