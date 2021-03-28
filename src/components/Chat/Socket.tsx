import React, { useRef } from 'react';
import { io } from 'socket.io-client';
import Chat from './Chat';


interface SocketProps {
    className?: string
}
export default function Socket(props: SocketProps) {

    const socket = useRef(io("wss://api-23eqo.ondigitalocean.app", {
        transports: ["websocket"],
        upgrade: false,
    }));

    return (
        <Chat socket={socket} className={props.className}/>
    )
}