import React, { useState } from 'react';
import styled from 'styled-components';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import Bottom from './Bottom';
import Messages from './Messages';
import Top from './Top';


interface ChatProps {
  className?: string,
  socket: React.MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap>>
}
interface BgProps {
  width: number,
  height: number
}

const Bg = styled.div.attrs((props: BgProps): any => ({
  style: {
    width: `${props.width.toString()}px`,
    height: `${props.height.toString()}px`
  }
}))`
    background: rgba(0,0,0,0.5);
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const initialSize = {
  width: 360,
  height: 400
}

export default function Chat(props: ChatProps) {
  const [size, setSize] = useState(initialSize);
  const [chat, setChat] = useState(1);
  const [newMyMessage, setNewMyMessage] = useState('');


  return (
    <Bg className={props.className} width={size.width} height={size.height}>
      <Top setSize={setSize} size={size} chat={chat} setChat={setChat} />
      <Messages socket={props.socket} newMyMessage={newMyMessage} chat={chat}/>
      <Bottom socket={props.socket} setNewMyMessage={setNewMyMessage} />
    </Bg>
  );
}

