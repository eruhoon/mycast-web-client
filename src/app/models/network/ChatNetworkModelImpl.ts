import { Chat } from '../chat/Chat';
import { TypeCallback } from '../common/callback/TypeCallback';
import { Notification } from '../notification/Notification';
import { Profile } from '../profile/Profile';
import { SocketModel } from '../socket/SocketModel';
import { WebSocketModel } from '../socket/WebSocketModel';
import { User } from '../user/User';
import { ChatNetworkModel } from './ChatNetworkModel';

export class ChatNetworkModelImpl implements ChatNetworkModel {

    private mSocket: SocketModel;
    private mOnRefreshMyProfile: TypeCallback<Profile>;
    private mOnRefreshChatList: TypeCallback<Chat[]>;
    private mOnRefreshUserList: TypeCallback<User[]>;
    private mOnNotifcationReceived: TypeCallback<Notification>;
    private mOnChat: TypeCallback<Chat>;

    public constructor(privateKey: string) {
        this.mSocket = this.createSocketModel(privateKey);
        this.mOnRefreshChatList = _ => { };
        this.mOnChat = _ => { };
    }

    public chat(chat: string): void {
        this.mSocket.chat(chat);
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

    public setOnNotificationReceivedCallback(
        callback: TypeCallback<Notification>): void {

        this.mOnNotifcationReceived = callback;
    }

    public setOnChatCallback(callback: TypeCallback<Chat>): void {
        this.mOnChat = callback;
    }

    private onRefreshMyProfile(profile: Profile): void {
        this.mOnRefreshMyProfile(profile);
    }

    private onRefreshChatList(chats: Chat[]): void {
        this.mOnRefreshChatList(chats);
    }

    private onChat(chat: Chat): void {
        this.mOnChat(chat);
    }

    private createSocketModel(privateKey: string): SocketModel {
        const model = new WebSocketModel(privateKey);
        model.setOnRefreshMyProfileCallback(
            profile => this.onRefreshMyProfile(profile));
        model.setOnRefreshChatListCallback(
            chats => this.onRefreshChatList(chats));
        model.setOnRefreshUserListCallback(
            users => this.mOnRefreshUserList(users));
        model.setOnNotificationReceived(
            notification => this.mOnNotifcationReceived(notification));
        model.setOnChatCallback(chat => this.onChat(chat));
        return model;
    }
}
