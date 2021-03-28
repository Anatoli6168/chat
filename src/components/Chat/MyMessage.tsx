import React from 'react';
import styled from 'styled-components';



interface MyMessageProps {
    text: string,
    createdAt: Date
}
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 0 8px 0;
`;
const Area = styled.div`
    padding: 11px 12px;
    background: #212121;
    color: white;
    border-radius: 20px 20px 0px 20px;
    max-width: 60%;
    font-size: 13px;
`;
const Text = styled.div`
    line-height: 15px;
    word-break: break-all;
`;
const Time = styled.div`
    font-size: 12px;
    color: white;
    opacity: 0.4;
    margin: 0 10px 0 0;
`;
export default function MyMessage(props: MyMessageProps) {
    return (
        <Container>
            <Time> {props.createdAt.getHours()}: {props.createdAt.getMinutes()} </Time>
            <Area>
                <Text>{props.text}</Text>
            </Area>
        </Container>
    )
}
