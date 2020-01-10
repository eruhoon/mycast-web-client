import { Chat } from '../chat/Chat';
import { TypeCallback } from '../common/callback/TypeCallback';
import { WebSocketModel } from '../socket/WebSocketModel';
import { ChatNetworkModel } from './ChatNetworkModel';

export class ChatNetworkModelImpl implements ChatNetworkModel {

    private mOnRefreshChatList: TypeCallback<Chat[]>;
    private mOnChat: TypeCallback<Chat>;

    public constructor(privateKey: string) {
        this.mOnRefreshChatList = _ => { };
        this.mOnChat = _ => { };
        this.initSocketModel(privateKey);
    }

    public setOnRefreshChatListCallback(callback: TypeCallback<Chat[]>) {
        this.mOnRefreshChatList = callback;
    }

    public setOnChatCallback(callback: TypeCallback<Chat>): void {
        this.mOnChat = callback;
    }

    private onRefreshChatList(chats: Chat[]): void {
        this.mOnRefreshChatList(chats);
    }

    private onChat(chat: Chat): void {
        this.mOnChat(chat);
    }

    private initSocketModel(privateKey: string): void {
        const model = new WebSocketModel(privateKey);
        model.setOnRefreshChatListCallback(
            chats => this.onRefreshChatList(chats));
        model.setOnChatCallback(chat => this.onChat(chat));
    }
}
