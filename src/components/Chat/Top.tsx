import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import arrowSmall from '../../public/arrowSmall.svg';
import line from '../../public/line.svg';
import vector from '../../public/vector.svg';


interface TopProps {
    size: {
        width: number;
        height: number;
    },
    setSize: React.Dispatch<React.SetStateAction<{
        width: number;
        height: number;
    }>>,
    setChat: React.Dispatch<React.SetStateAction<number>>,
    chat: number
}
interface BarProps {
    select: number
}
interface MenuProps {
    activate: boolean
}
interface ArrayProps {
    scroll: boolean,
    position: boolean
}
interface AreaProps {
    position: boolean
}
interface Ellips2Props {
    turn: boolean
}

const Area = styled.div<AreaProps>`
    width: 100%;
    height: 40px;
    display: flex;
    font-size: 13px;
    background: rgba(0,0,0,0.3);
    align-items: space-between;
`;
const Bar = styled.div<BarProps>`
    text-transform: uppercase;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-shrink: 2;
    align-items: center;
    color: #23B838;
    order: 1;
    & * {
        cursor: pointer;
        margin: 0 7.5px;
        &:first-child {
            margin: 0 7.5px 0 15px;
        }
        &:last-child {
            margin: 0 15px 0 7.5px;
        }
        &:nth-child(${props => props.select.toString()}) {
            color: white;
            cursor: default;
        }
    }
`;
const Array = styled.img<ArrayProps>`
    ${props => props.scroll ? '' : 'display: none;'}
    width: 12px;
    margin: 0 0 0 3px;
    cursor: pointer;
    transform: rotate(-90deg);
    order: 2;
    ${props => props.position ? 'order: 1;transform: rotate(90deg);& ~ div {&:first-child {order: 2;}}' : ''}
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 1;
    order: 3;
`;
const Select = styled.div`
    text-transform: uppercase;
    flex-shrink:0;
    color: white;
    align-self: flex-start;
    margin: 13px 5px 0 5px;
`;
const SelectButton = styled.div<MenuProps>`
    display: flex;
    justify-content: center;
    border-radius: 17px;
    cursor: pointer;
    width: 44px;
    &:hover {
        background: rgba(255, 255, 255, 0.4);
    }
    img {
        margin: 0 0 0 4px;
        transform: rotate(${props => props.activate ? '180' : '0'}deg);
    }
`;
const Menu = styled.div<MenuProps>`
    display: ${props => props.activate ? "block" : "none"};
    position: relative;
`;
const Language = styled.div<MenuProps>`
    margin: 5px 0 0 5px;
    cursor: pointer;
    ${props => props.activate ? 'display: none;' : ''}
`;
const Ellips = styled.div`
    flex-shrink:0;
    width: 18px;
    height: 18px;
    cursor: pointer;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: rgba(255, 255, 255, 0.4);
    }
`;
const Ellips1 = styled(Ellips)`
    user-select: none;
    transform: rotate(-45deg);
    img {
        
        &:first-child {
            transform: rotate(45deg);
        }
        &:last-child {
            transform: rotate(-135deg);
        }
    }
`;
const Ellips2 = styled(Ellips) <Ellips2Props>`
    margin: 0 10px 0 10px;
    ${props => props.turn ? 'transform: rotate(90deg);' : ''}
`;

export default function Top(props: TopProps) {
    //const [select, setSelect] = useState(1);
    const [selectActivate, setSelectActivate] = useState(false);
    const [language, setLanguage] = useState('ru');
    const [scroll, setScroll] = useState(1);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [turn, setTurn] = useState(0);
    const bar = useRef<HTMLDivElement>(null);

    const handleSelectLanguage = (event: React.MouseEvent<HTMLDivElement>) => {
        setLanguage(event.currentTarget.innerHTML);
        setSelectActivate(false);
    };

    const handleResize = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setTurn(0);
        const x = event.currentTarget.getBoundingClientRect().x - props.size.width + 10;
        const y = props.size.height + event.currentTarget.getBoundingClientRect().y + 12;
        function resize(event: MouseEvent) {
            const width = event.pageX - x;
            const height = y - event.pageY;
            if (height <= 40) return;
            if (width < 170) return;
            props.setSize({ height, width });
            if (360 > width) setScroll(1)
            else setScroll(0)
        }
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', () => document.removeEventListener('mousemove', resize));
    };


    const handleTurn = () => {
        if (!turn) {
            setTurn(props.size.height);
            props.setSize(prev => ({ ...prev, height: 40 }))
        } else {
            props.setSize(prev => ({ ...prev, height: turn }));
            setTurn(0);
        }
    }
    const handleScroll = () => {
        if (bar.current?.scrollLeft === 0) {
            bar.current.scrollLeft = 1000;
            setScrollLeft(1000);
            return;
        }
        if (typeof bar.current?.scrollLeft === 'number' && bar.current.scrollLeft > 0) {
            bar.current.scrollLeft = 0;
            setScrollLeft(0);
        }
    };

    return (
        <Area position={!!scrollLeft}>
            <Array src={arrowSmall} alt="" scroll={!!scroll} onClick={handleScroll} position={!!scrollLeft} />
            <Bar select={props.chat} ref={bar}>
                <div onClick={() => props.setChat(1)}>Общий</div>
                <div onClick={() => props.setChat(2)}>Клан</div>
                <div onClick={() => props.setChat(3)}>Друзья</div>
                <div onClick={() => props.setChat(4)}>Новости</div>
            </Bar>
            <Container>
                <Select>
                    <SelectButton activate={selectActivate} onClick={() => setSelectActivate(prev => !prev)}>
                        {language}
                        <img src={arrowSmall} alt="" />
                    </SelectButton>
                    <Menu activate={selectActivate}>
                        <Language activate={language === "ru"} onClick={handleSelectLanguage}>ru</Language>
                        <Language activate={language === "en"} onClick={handleSelectLanguage}>en</Language>
                        <Language activate={language === "zho"} onClick={handleSelectLanguage}>zho</Language>
                    </Menu>
                </Select>
                <Ellips1 onMouseDown={handleResize}>
                    <img src={vector} alt="" draggable={false} />
                    <img src={vector} alt="" draggable={false} />
                </Ellips1>
                <Ellips2 onClick={handleTurn} turn={!!turn}>
                    <img src={line} alt="" />
                </Ellips2>
            </Container>
        </Area>
    );
}