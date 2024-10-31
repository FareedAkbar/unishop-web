import { io, Socket } from "socket.io-client";
// https://ipos-dev.iconsole.com.au
// https://ipi.iconsole.com.au
// https://ipos-dev.iconsole.com.au
const socket: Socket = io("https://ipos-dev.iconsole.com.au", {
    autoConnect: true,
    transports: ["websocket"],
}); // Replace with your server URL


export default socket;