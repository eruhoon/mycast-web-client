import { Chat } from '../chat/Chat';
import { MutableChat } from '../chat/MutableChat';
import { TypeCallback } from '../common/callback/TypeCallback';
import { RefreshChat, VegaChatSocketModel } from './VegaChatSocketModel';

export class WebSocketModel extends VegaChatSocketModel {

    private static readonly URL = 'ws://mycast.xyz:8001';

    private mPrivKey: string;
    private mWebSocket: WebSocket;
    private mOnRefreshChatList: TypeCallback<Chat[]>;

    public constructor(privateKey: string) {
        super();
        this.mPrivKey = privateKey;
        this.mWebSocket = new WebSocket(WebSocketModel.URL);
        this.mOnRefreshChatList = _ => { };

        this.mWebSocket.onopen = () => this.onOpenSocket();
        this.mWebSocket.onmessage = message => this.onRawMessage(message);
        this.mWebSocket.onclose = () => this.onClose();
    }

    public login(): void {
        this.sendMessage('user-login', {
            channel: 'chat',
            privateKey: this.mPrivKey
        });
    }

    public setOnRefreshChatListCallback(callback: TypeCallback<Chat[]>) {
        this.mOnRefreshChatList = callback;
    }

    protected onRefreshChatList(refreshChats: RefreshChat[]) {
        const chats: Chat[] = refreshChats.map(refreshChat => {
            const chat = new MutableChat();
            chat.setHash(refreshChat.hash);
            chat.setIcon(refreshChat.icon);
            chat.setLevel(refreshChat.level);
            chat.setNickname(refreshChat.nickname);
            return chat;
        });
        this.mOnRefreshChatList(chats);
    }

    private onOpenSocket(): void {
        console.log('onOpenSocket');
        this.login();
    }

    private onRawMessage(event: MessageEvent): void {
        console.log('onMessage', event);
        if (!event || !event.data || typeof (event.data) !== 'string') {
            console.error('Invalid data');
            return;
        }
        this.onMessage(event.data);
    }

    private onClose(): void {
        console.log('onClose');
    }

    private sendMessage(commandType: string, resource: any) {
        const sendMsg = { commandType, resource };
        console.log(sendMsg);
        this.mWebSocket.send(JSON.stringify(sendMsg));
    }
}
