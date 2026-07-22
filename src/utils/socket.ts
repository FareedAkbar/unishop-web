import { io, type Socket } from "socket.io-client";
// https://ipos-dev.iconsole.com.au
// https://ipi.iconsole.com.au
// https://ipos-dev.iconsole.com.au
const socket: Socket = io(`${process.env.NEXT_PUBLIC_PASSKEY_IPOS}`, {
    autoConnect: true,
    transports: ["websocket"],
}); // Replace with your server URL


export default socket;