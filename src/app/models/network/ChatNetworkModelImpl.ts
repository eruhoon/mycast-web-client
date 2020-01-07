import { Chat } from '../chat/Chat';
import { TypeCallback } from '../common/callback/TypeCallback';
import { WebSocketModel } from '../socket/WebSocketModel';
import { ChatNetworkModel } from './ChatNetworkModel';

export class ChatNetworkModelImpl implements ChatNetworkModel {

    private mOnRefreshChatList: TypeCallback<Chat[]>;

    public constructor(privateKey: string) {
        this.mOnRefreshChatList = _ => { };

        this.initSocketModel(privateKey);
    }

    public setOnRefreshChatListCallback(callback: TypeCallback<Chat[]>) {
        this.mOnRefreshChatList = callback;
    }

    private onRefreshChatList(chats: Chat[]): void {
        this.mOnRefreshChatList(chats);
    }

    private initSocketModel(privateKey: string): void {
        const model = new WebSocketModel(privateKey);
        model.setOnRefreshChatListCallback(
            chats => this.onRefreshChatList(chats));
    }
}
