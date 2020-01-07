import { SocketModel } from './SocketModel';

export abstract class VegaChatSocketModel implements SocketModel {

    public abstract login(): void;

    protected abstract onRefreshChatList(chats: RefreshChat[]): void;

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
        switch (messageData.commandType) {
            case 'applyCurrentChatList':
                this.onRefreshChatList(messageData.response);
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
    nickname: string,
};
