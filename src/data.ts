import { Icon } from "./components/Chat/Message";

export interface Data {
    from: string,
    text: string,
    createdAt: string,
    icon?: Icon,
    status?: Icon,
    own?: true
}
export const name ='Anatoliy';

export const startData: Data[] = [
    {
        from: 'BivOld',
        text: 'Прикольно. все СОС потрачены, теперь игра закончена)))',
        createdAt: '2021-03-28T14:31:22.684Z',
        icon: 'ada',
        status: 'admin'
    },
    {
        from: 'BivOld',
        text: 'Я думал, что они будут пополнятся разв н-ное время. А тут реально игра закончена',
        createdAt: '2021-03-28T14:28:23.684Z',
        icon: 'btc'
    },
    {
        from: 'Nigativ',
        text: 'wac можно только купить',
        createdAt: '2021-03-28T14:28:24.684Z',
        icon: 'ada',
        status: 'moderator'
    },
    {
        from: 'Skylifesky',
        text: 'Цена 1 wac =0,1$ и цена не изменится',
        createdAt: '2021-03-28T14:28:22.684Z',
        icon: 'btc',
        status: 'admin'
    },
    {
        from: 'i',
        text: 'Сегодня идем на Германию',
        createdAt: '2021-03-28T10:21:22.684Z',
        own: true
    }
]