import { Chat } from '../chat/Chat';
import { TypeCallback } from '../common/callback/TypeCallback';
import { MutableNotification } from '../notification/MutableNotification';
import { NotificationChannelHash } from '../notification/NotificationChannel';
import { VegaNotification } from '../notification/VegaNotification';
import { MutableProfile } from '../profile/MutableProfile';
import { Profile } from '../profile/Profile';
import { MutableUser } from '../user/MutableUser';
import { User } from '../user/User';
import { RefreshChat } from './RefreshChat';
import { RefreshChatDto } from './RefreshChatDto';
import {
  RawChatRequest,
  ReceivedNotification,
  RefreshMyProfile,
  RefreshUser,
  VegaChatSocketModel,
} from './VegaChatSocketModel';

export class WebSocketModel extends VegaChatSocketModel {
  private static readonly HTTPS_URL = 'wss://mycast.xyz:8002';

  private mPrivKey: string;
  private mOpen: boolean;
  private mWebSocket: WebSocket;
  private mOnRefreshMyProfile: TypeCallback<Profile>;
  private mOnUpdateLink: TypeCallback<UpdateLinkResponse>;
  private mOnRefreshChatList: TypeCallback<Chat[]>;
  private mOnRefreshUserList: TypeCallback<User[]>;
  private mOnNotificationReceived: TypeCallback<VegaNotification>;
  private mOnChat: TypeCallback<Chat>;

  public constructor(privateKey: string) {
    super();
    this.mPrivKey = privateKey;
    this.mOpen = false;
    this.mOnRefreshChatList = (_) => {};
    this.mOnRefreshUserList = (_) => {};
    this.mOnNotificationReceived = (_) => {};
    this.mOnChat = (_) => {};

    this.mWebSocket = this.connect();
  }

  public isOpen(): boolean {
    return this.mOpen;
  }

  public login(): void {
    this.sendMessage('user-login', {
      channel: 'chat',
      privateKey: this.mPrivKey,
    });
  }

  public modifyProfile(
    name: string,
    icon: string,
    statusMessage: string
  ): void {
    this.sendMessage('modify-profile', {
      privateKey: this.mPrivKey,
      userInfo: { nickname: name, icon, statusMessage },
    });
  }

  protected requestChat(request: RawChatRequest): void {
    this.sendMessage('chat', {
      userKey: this.mPrivKey,
      msg: request.msg,
      type: request.type,
    });
  }

  protected requestNotify(to: string): void {
    this.sendMessage('notify-user', { from: this.mPrivKey, to });
  }

  public setOnRefreshMyProfileCallback(callback: TypeCallback<Profile>) {
    this.mOnRefreshMyProfile = callback;
  }

  public setOnUpdateLinkCallback(callback: TypeCallback<UpdateLinkResponse>) {
    this.mOnUpdateLink = callback;
  }

  public setOnRefreshChatListCallback(callback: TypeCallback<Chat[]>) {
    this.mOnRefreshChatList = callback;
  }

  public setOnRefreshUserListCallback(callback: TypeCallback<User[]>) {
    this.mOnRefreshUserList = callback;
  }

  public setOnNotificationReceived(
    callback: TypeCallback<VegaNotification>
  ): void {
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
    profile.setStatusMessage(rawProfile.statusMessage);
    this.mOnRefreshMyProfile(profile);
  }

  protected onRefreshUserList(refreshUsers: RefreshUser[]) {
    const users: User[] = refreshUsers.map((refreshUser) => {
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

  protected onNotificationReceived(receivedNotification: ReceivedNotification) {
    const notification = new MutableNotification();
    notification.setIcon(receivedNotification.from.icon);
    notification.setTitle(receivedNotification.from.nickname);
    notification.setBody(
      `"${receivedNotification.from.nickname}"로 부터 알림이 왔어요.`
    );
    notification.setChannel(NotificationChannelHash.ALARM);
    this.mOnNotificationReceived(notification);
  }

  protected onUpdateLink(chatHash: string, link: any): void {
    this.mOnUpdateLink({
      chatHash,
      title: link.title,
      thumbnail: link.thumbnail,
    });
  }

  protected onRefreshChatList(refreshChats: RefreshChatDto[]) {
    const chats: Chat[] = refreshChats.map((dto) => {
      return new RefreshChat(dto);
    });
    this.mOnRefreshChatList(chats);
  }

  protected onChat(dto: RefreshChatDto) {
    const chat = new RefreshChat(dto);
    this.mOnChat(chat);
  }

  private onOpenSocket(): void {
    console.log('connected');
    this.mOpen = true;
    this.login();
  }

  private onRawMessage(event: MessageEvent): void {
    if (!event || !event.data || typeof event.data !== 'string') {
      console.error('Invalid data');
      return;
    }
    this.onMessage(event.data);
  }

  private onClose(): void {
    console.log('onClose');
    this.mOpen = false;
    setTimeout(() => {
      console.log('try to reconnect');
      this.mWebSocket = this.connect();
    }, 3000);
  }

  private sendMessage(commandType: string, resource: any) {
    const sendMsg = { commandType, resource };
    this.mWebSocket.send(JSON.stringify(sendMsg));
  }

  private connect(): WebSocket {
    const socket = new WebSocket(WebSocketModel.getUrl());
    socket.onopen = () => this.onOpenSocket();
    socket.onmessage = (message) => this.onRawMessage(message);
    socket.onclose = () => this.onClose();
    return socket;
  }

  private static getUrl(): string {
    return this.HTTPS_URL;
  }
}

export type UpdateLinkResponse = {
  chatHash: string;
  title: string;
  thumbnail: string;
};
