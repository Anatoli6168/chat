import React, { useState } from 'react';
import styled from 'styled-components';
import ada from '../../public/ada.svg'
import moderator from '../../public/moderator.svg'
import admin from '../../public/admin.svg'
import btc from '../../public/btc.svg'

const modif = {
    btc,
    admin,
    moderator,
    ada
}
type Modif = typeof modif
export type Icon = keyof Modif


interface MessageProps {
    from: string,
    text: string,
    createdAt: Date,
    icon?: Icon,
    status?: Icon,
    id?: string
}
const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 8px 0;
`;
const Area = styled.div`
    padding: 11px 12px;
    background: white;
    border-radius: 20px 20px 20px 0px;
    max-width: 60%;
    font-size: 13px;
`;
const Head = styled.div`
    color: #999999;
    margin: 0 0 6px 0;
    display: flex;
    align-items: center;
`;
const Level = styled.div`
    color: green;
    margin: 0 0 0 6px;
`;
const From = styled.div`
    margin: 0 5px;
`;
const Text = styled.div`
    line-height: 15px;
    word-break: break-all;
`;
const Time = styled.div`
    font-size: 12px;
    color: white;
    opacity: 0.4;
    margin: 0 0 0 10px;
`;
export default function Message(props: MessageProps) {
    const [level] = useState(Math.ceil(Math.random() * 10))

    return (
        <Container id={props.id}>
            <Area>
                <Head>
                    {
                        (function () {
                            const src = props.icon && modif[props.icon];
                            if (src) return (<img src={src} alt="" />)
                        })()
                    }
                    <From>{props.from}</From>
                    {
                        (function () {
                            const src = props.status && modif[props.status];
                            if (src) return (<img src={src} alt="" />)
                        })()
                    }
                    <Level>{level}</Level>
                </Head>
                <Text>{props.text}</Text>
            </Area>
            <Time>{props.createdAt.getHours()}:{props.createdAt.getMinutes()}</Time>
        </Container>
    )
}