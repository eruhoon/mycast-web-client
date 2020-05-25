import { Chat } from '../chat/Chat';
import { ChatTypeParser } from '../chat/util/ChatTypeParser';
import { TypeCallback } from '../common/callback/TypeCallback';
import { MutableNotification } from '../notification/MutableNotification';
import { Notification } from '../notification/Notification';
import { MutableProfile } from '../profile/MutableProfile';
import { Profile } from '../profile/Profile';
import { MutableUser } from '../user/MutableUser';
import { User } from '../user/User';
import { RefreshChat } from './RefreshChat';
import { RefreshChatDto } from './RefreshChatDto';
import {
    RawChatRequest, ReceivedNotification, RefreshMyProfile, RefreshUser, VegaChatSocketModel
} from './VegaChatSocketModel';

export class WebSocketModel extends VegaChatSocketModel {

    private static readonly URL = 'ws://mycast.xyz:8001';

    private mPrivKey: string;
    private mWebSocket: WebSocket;
    private mChatTypeParser: ChatTypeParser;
    private mOnRefreshMyProfile: TypeCallback<Profile>;
    private mOnRefreshChatList: TypeCallback<Chat[]>;
    private mOnRefreshUserList: TypeCallback<User[]>;
    private mOnNotificationReceived: TypeCallback<Notification>;
    private mOnChat: TypeCallback<Chat>;

    public constructor(privateKey: string) {
        super();
        this.mPrivKey = privateKey;
        this.mWebSocket = new WebSocket(WebSocketModel.URL);
        this.mChatTypeParser = new ChatTypeParser();
        this.mOnRefreshChatList = _ => { };
        this.mOnRefreshUserList = _ => { };
        this.mOnNotificationReceived = _ => { };
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

    public modifyProfile(name: string, icon: string): void {
        this.sendMessage('modify-profile', {
            privateKey: this.mPrivKey,
            userInfo: { nickname: name, icon },
        });
    }

    protected requestChat(request: RawChatRequest): void {
        this.sendMessage('chat', {
            userKey: this.mPrivKey,
            msg: request.msg,
            type: request.type
        });
    }

    protected requestNotify(to: string): void {
        this.sendMessage('notify-user', { from: this.mPrivKey, to });
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

    public setOnNotificationReceived(
        callback: TypeCallback<Notification>): void {

        this.mOnNotificationReceived = callback;
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

    protected onNotificationReceived(
        receivedNotification: ReceivedNotification) {

        const notification = new MutableNotification();
        notification.setIcon(receivedNotification.from.icon);
        notification.setTitle(receivedNotification.from.nickname);
        notification.setBody(`"${receivedNotification.from.nickname}"로 부터 알림이 왔어요.`);
        this.mOnNotificationReceived(notification);
    }

    protected onRefreshChatList(refreshChats: RefreshChatDto[]) {
        const chats: Chat[] = refreshChats.map(dto => {
            return new RefreshChat(dto);
        });
        this.mOnRefreshChatList(chats);
    }

    protected onChat(dto: RefreshChatDto) {
        const chat = new RefreshChat(dto);
        this.mOnChat(chat);
    }

    private onOpenSocket(): void {
        this.login();
    }

    private onRawMessage(event: MessageEvent): void {
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
