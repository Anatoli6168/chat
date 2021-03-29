import React, { useState } from 'react';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import emodjis from '../../public/emodjis.svg';
import { name } from '../../data';


interface ButtonProps {
    socket: React.MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap>>,
    setNewMyMessage: React.Dispatch<React.SetStateAction<string>>
}
const Area = styled.div`
    width: 100%;
    min-height: 40px;
    background: rgba(0,0,0,0.3);
    display: flex;
    flex-shrink: 0;
    align-items: center;
`;
const Input = styled(TextareaAutosize)`
    flex-grow: 1;
    margin: 6px 0 6px 20px;
    resize: none;
    background: none;
    outline: none;
    border: none;
    font-size: 13px;
    caret-color: white;
    color: white;
`;
const Smiles = styled.img`
    margin: 0 20px;
    pointer-events: none;
`;

export default function Bottom(props: ButtonProps) {
    const [value, setValue] = useState('');


    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.currentTarget.value);
    };

    const handleUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            const message = {
                from: name,
                text: value
            };
            props.socket.current.emit("message", message, (err: string | null) => {
                if (err) {
                    console.error(err);
                } else {
                    props.setNewMyMessage(value);
                    setValue('');
                }
            });
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
        event.stopPropagation();
    };

    return (
        <Area>
            <Input value={value} onKeyUp={handleUp} onChange={handleChange} placeholder="Напишите сообщение..." />
            <Smiles src={emodjis} alt="" onMouseDown={handleClick}/>
        </Area>
    )
}