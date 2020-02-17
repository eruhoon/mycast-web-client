import { Chat } from '../chat/Chat';
import { MutableChat } from '../chat/MutableChat';
import { MutableChatMessage } from '../chat/MutableChatMessage';
import { ChatTypeParser } from '../chat/util/ChatTypeParser';
import { TypeCallback } from '../common/callback/TypeCallback';
import { MutableProfile } from '../profile/MutableProfile';
import { Profile } from '../profile/Profile';
import { MutableUser } from '../user/MutableUser';
import { User } from '../user/User';
import {
    RawChatRequest, RefreshChat, RefreshMyProfile, RefreshUser, VegaChatSocketModel
} from './VegaChatSocketModel';

export class WebSocketModel extends VegaChatSocketModel {

    private static readonly URL = 'ws://mycast.xyz:8001';

    private mPrivKey: string;
    private mWebSocket: WebSocket;
    private mChatTypeParser: ChatTypeParser;
    private mOnRefreshMyProfile: TypeCallback<Profile>;
    private mOnRefreshChatList: TypeCallback<Chat[]>;
    private mOnRefreshUserList: TypeCallback<User[]>;
    private mOnChat: TypeCallback<Chat>;

    public constructor(privateKey: string) {
        super();
        this.mPrivKey = privateKey;
        this.mWebSocket = new WebSocket(WebSocketModel.URL);
        this.mChatTypeParser = new ChatTypeParser();
        this.mOnRefreshChatList = _ => { };
        this.mOnRefreshUserList = _ => { };
        this.mOnChat = _ => { };

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

    protected requestChat(request: RawChatRequest): void {
        this.sendMessage('chat', {
            userKey: this.mPrivKey,
            msg: request.msg,
            type: request.type
        });
    }

    public setOnRefreshMyProfileCallback(callback: TypeCallback<Profile>) {
        this.mOnRefreshMyProfile = callback;
    }

    public setOnRefreshChatListCallback(callback: TypeCallback<Chat[]>) {
        this.mOnRefreshChatList = callback;
    }

    public setOnRefreshUserListCallback(callback: TypeCallback<User[]>) {
        this.mOnRefreshUserList = callback;
    }

    public setOnChatCallback(callback: TypeCallback<Chat>): void {
        this.mOnChat = callback;
    }

    protected onRefreshMyProfile(rawProfile: RefreshMyProfile): void {
        const profile = new MutableProfile();
        profile.setName(rawProfile.nickname);
        profile.setIcon(rawProfile.icon);
        profile.setLevel(rawProfile.level);
        this.mOnRefreshMyProfile(profile);
    }

    protected onRefreshUserList(refreshUsers: RefreshUser[]) {
        const users: User[] = refreshUsers.map(refreshUser => {
            const user = new MutableUser(refreshUser.hash);
            user.setName(refreshUser.nickname);
            user.setIcon(refreshUser.icon);
            user.setLevel(refreshUser.level);
            user.setMobile(refreshUser.mobile);
            user.setComputer(refreshUser.computer);
            return user;
        });
        this.mOnRefreshUserList(users);
    }

    protected onRefreshChatList(refreshChats: RefreshChat[]) {
        const chats: Chat[] = refreshChats.map(refreshChat => {
            const message = new MutableChatMessage();
            message.setType(this.mChatTypeParser.parse(refreshChat.type));
            message.setMessage(refreshChat.msg.response);
            const chat = new MutableChat();
            chat.setHash(refreshChat.hash);
            chat.setIcon(refreshChat.icon);
            chat.setLevel(refreshChat.level);
            chat.setNickname(refreshChat.nickname);
            chat.addMessage(message);
            return chat;
        });
        this.mOnRefreshChatList(chats);
    }

    protected onChat(res: RefreshChat) {
        const message = new MutableChatMessage();
        message.setType(this.mChatTypeParser.parse(res.type));
        message.setMessage(res.msg.response);
        const chat = new MutableChat();
        chat.setHash(res.hash);
        chat.setIcon(res.icon);
        chat.setLevel(res.level);
        chat.setNickname(res.nickname);
        chat.addMessage(message);
        this.mOnChat(chat);
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
        this.mWebSocket.send(JSON.stringify(sendMsg));
    }
}
