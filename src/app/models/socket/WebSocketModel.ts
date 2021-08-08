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
import { SocketRequest } from './SocketModel';
import {
  ReactionResponse,
  ReceivedNotification,
  RefreshMyProfile,
  RefreshUser,
  VegaChatSocketModel,
} from './VegaChatSocketModel';

export class WebSocketModel extends VegaChatSocketModel {
  private static readonly HTTPS_URL = 'wss://mycast.xyz:8002';

  #privateKey: string;
  #open: boolean;
  #webSocket: WebSocket;
  #onRefreshMyProfile: TypeCallback<Profile>;
  #onUpdateLink: TypeCallback<UpdateLinkResponse>;
  #onRefreshChatList: TypeCallback<Chat[]>;
  #onRefreshUserList: TypeCallback<User[]>;
  #onNotificationReceived: TypeCallback<VegaNotification>;
  #onChat: TypeCallback<Chat>;
  #onReaction: TypeCallback<ReactionResponse>;

  constructor(privateKey: string) {
    super();
    this.#privateKey = privateKey;
    this.#open = false;
    this.#onRefreshChatList = (_) => {};
    this.#onRefreshUserList = (_) => {};
    this.#onNotificationReceived = (_) => {};
    this.#onChat = (_) => {};

    this.#webSocket = this.connect();
  }

  isOpen(): boolean {
    return this.#open;
  }

  send(request: SocketRequest): void {
    this.#webSocket.send(JSON.stringify(request));
  }

  login(): void {
    this.sendMessage('user-login', {
      channel: 'chat',
      privateKey: this.#privateKey,
    });
  }

  setOnRefreshMyProfileCallback(callback: TypeCallback<Profile>) {
    this.#onRefreshMyProfile = callback;
  }

  setOnUpdateLinkCallback(callback: TypeCallback<UpdateLinkResponse>) {
    this.#onUpdateLink = callback;
  }

  setOnRefreshChatListCallback(callback: TypeCallback<Chat[]>) {
    this.#onRefreshChatList = callback;
  }

  setOnRefreshUserListCallback(callback: TypeCallback<User[]>) {
    this.#onRefreshUserList = callback;
  }

  setOnNotificationReceived(callback: TypeCallback<VegaNotification>): void {
    this.#onNotificationReceived = callback;
  }

  setOnChatCallback(callback: TypeCallback<Chat>): void {
    this.#onChat = callback;
  }

  setOnReactionCallback(callback: TypeCallback<ReactionResponse>): void {
    this.#onReaction = callback;
  }

  protected onRefreshMyProfile(rawProfile: RefreshMyProfile): void {
    const profile = new MutableProfile();
    profile.setName(rawProfile.nickname);
    profile.setIcon(rawProfile.icon);
    profile.setLevel(rawProfile.level);
    profile.setStatusMessage(rawProfile.statusMessage);
    this.#onRefreshMyProfile(profile);
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
    this.#onRefreshUserList(users);
  }

  protected onNotificationReceived(receivedNotification: ReceivedNotification) {
    const notification = new MutableNotification();
    notification.setIcon(receivedNotification.from.icon);
    notification.setTitle(receivedNotification.from.nickname);
    notification.setBody(
      `"${receivedNotification.from.nickname}"로 부터 알림이 왔어요.`
    );
    notification.setChannel(NotificationChannelHash.ALARM);
    this.#onNotificationReceived(notification);
  }

  protected onUpdateLink(chatHash: string, link: any): void {
    this.#onUpdateLink({
      chatHash,
      title: link.title,
      thumbnail: link.thumbnail,
    });
  }

  protected onRefreshChatList(refreshChats: RefreshChatDto[]) {
    const chats: Chat[] = refreshChats.map((dto) => {
      return new RefreshChat(dto);
    });
    this.#onRefreshChatList(chats);
  }

  protected onChat(dto: RefreshChatDto) {
    const chat = new RefreshChat(dto);
    this.#onChat(chat);
  }

  protected onReaction(reactionResponse: ReactionResponse): void {
    this.#onReaction(reactionResponse);
  }

  private onOpenSocket(): void {
    console.log('connected');
    this.#open = true;
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
    this.#open = false;
    setTimeout(() => {
      console.log('try to reconnect');
      this.#webSocket = this.connect();
    }, 3000);
  }

  private sendMessage(commandType: string, resource: any) {
    const sendMsg = { commandType, resource };
    this.#webSocket.send(JSON.stringify(sendMsg));
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
