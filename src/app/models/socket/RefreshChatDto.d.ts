import { RefreshChatMessage } from './VegaChatSocketModel';

export type RefreshChatDto = {
    hash: string;
    icon: string;
    level: number;
    type: string;
    msg: RefreshChatMessage;
    nickname: string;
    isMobile: boolean;
    timestamp: string;
};
