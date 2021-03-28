import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { startData } from '../../data';
import Message from './Message';
import MyMessage from './MyMessage';
import { Data } from '../../data';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

interface MessageProps {
    socket: React.MutableRefObject<Socket<DefaultEventsMap, DefaultEventsMap>>,
    newMyMessage: string,
    chat: number
}
const Area = styled.div`
    flex-grow: 1;
    padding: 8px 10px;
    overflow: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 0px;
        background-color: none;
    }
    &::-webkit-scrollbar { //Так удобнее тестировать
        width: 7px;
        background-color: none;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.3);
        border-radius: 3.5px;
    }
`;

export default function Messages(props: MessageProps) {
    const [data1, setData1] = useState(startData);
    const [data2] = useState<Data[]>([]);
    const [data3] = useState<Data[]>([]);
    const [data4] = useState<Data[]>([]);
    const area = useRef<HTMLDivElement>(null);
    const [, setScroll] = useState(false);

    const datas = [
        data1,
        data2,
        data3,
        data4
    ]
    useEffect(() => {
        props.socket.current.on("message", (message: Data) => {
            let scroll = 0;
            if (area.current) scroll = area.current.scrollTop + area.current.clientHeight - area.current.scrollHeight + 10;
            setData1(prev => ([...prev, message]));
            if (scroll > 0 && area.current) area.current.scrollTop = area.current.scrollHeight - area.current.clientHeight;
        });
    }, [props.socket]);

    useEffect(() => {
        if (props.newMyMessage.length > 0) {
            setData1(prev => [...prev, {
                from: 'Anatoliy',
                text: props.newMyMessage,
                createdAt: (new Date()).toISOString(),
                own: true
            }])
            setTimeout(() => { if (area.current) area.current.scrollTop = area.current.scrollHeight - area.current.clientHeight; }, 0);
        }
    }, [props.newMyMessage])

    const handleScroll = (event: React.UIEvent<HTMLElement>) => {
        if (!event.currentTarget.scrollTop) fetch(`https://api-23eqo.ondigitalocean.app/api/messages?skip=${data1.length}&limit=${15}`)
            .then((response) => {
                return response.json();
            })
            .then((data: Data[]) => {
                setData1(prev => {
                    const newData = prev.slice();
                    const reverse = data.slice().reverse();
                    newData.unshift(...reverse);
                    return newData;
                })
                setScroll(true);
            });
    }

    useEffect(() => {
        setScroll(prev => {
            if (prev) {
                const anchor = document.getElementById('8f43cj347f');
                if (anchor && area.current) {
                    area.current.scrollTop = anchor.offsetTop + 32;
                }
                return false;
            }
            return prev;
        })
    }, [data1])

    useEffect(() => {
        if (area.current) area.current.scrollTop = area.current.scrollHeight - area.current.clientHeight;
    }, [])

    return (
        <Area ref={area} onScroll={handleScroll}>
            {
                datas[props.chat - 1].map((item, index) => {
                    if (index === 14) return (<Message from={item.from} text={item.text} createdAt={new Date(item.createdAt)} icon={item.icon} status={item.status} key={index} id="8f43cj347f" />)
                    if (!item.own) return (<Message from={item.from} text={item.text} createdAt={new Date(item.createdAt)} icon={item.icon} status={item.status} key={index} />)
                    else return <MyMessage text={item.text} createdAt={new Date(item.createdAt)} key={index} />;
                })
            }

        </Area>
    )
}