import { SocketModel } from './SocketModel';

export abstract class VegaChatSocketModel implements SocketModel {

    public abstract login(): void;

    protected abstract onRefreshChatList(chats: RefreshChat[]): void;
    protected abstract onChat(res): void;

    protected onMessage(rawMessage: string | null) {
        if (!rawMessage) {
            console.error('Invalid RawMessage');
            return;
        }

        try {
            const messageData: MessageData = JSON.parse(rawMessage);
            this.onMessageData(messageData);
        } catch (err) {
            console.error(err);
        }
    }

    protected onMessageData(messageData: MessageData) {
        console.log(messageData);
        switch (messageData.commandType) {
            case 'applyCurrentChatList':
                this.onRefreshChatList(messageData.response);
                break;
            case 'chat':
                this.onChat(messageData.response);
                break;
            default:
        }
    }

}

type MessageData = {
    commandType: string, // TODO: type
    request: any,
    response: any
};

export type RefreshChat = {
    hash: string,
    icon: string,
    level: number,
    type: string,
    msg: RefreshChatMessage,
    nickname: string,
    timestamp: string
};

export type RefreshChatMessage = {
    request: string,
    response: string,
};

/*
hash: "2b07dda6bbdd6531c07977e754a0b898ad5b890a499c4960d5d3408783405bbe"
icon: "https://i.imgur.com/wtClNPW.png"
iconBorderColor: "E8E8E8"
isMobile: false
level: 42
msg: {request: "https://i.imgur.com/6vZAKpf.jpg", response: "https://i.imgur.com/6vZAKpf.jpg"}
nickname: "백수의 사자 양"
timestamp: "Tue Jan 07 2020 22:33:07 GMT+0900 (GMT+09:00)"
type: "image"*/
