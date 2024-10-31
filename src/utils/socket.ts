import { io, Socket } from "socket.io-client";
// http://192.168.18.92:3000
// https://ipi.iconsole.com.au
// http://192.168.18.92:3000
const socket: Socket = io("http://192.168.18.92:3000", {
    autoConnect: true,
    transports: ["websocket"],
}); // Replace with your server URL


export default socket;