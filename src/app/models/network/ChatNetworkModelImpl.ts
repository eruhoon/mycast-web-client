import { Chat } from '../chat/Chat';
import { TypeCallback } from '../common/callback/TypeCallback';
import { VegaNotification } from '../notification/VegaNotification';
import { Profile } from '../profile/Profile';
import { ChatRequestFactory } from '../socket/chat-request/ChatRequestFactory';
import { SocketModel } from '../socket/SocketModel';
import { UpdateLinkResponse, WebSocketModel } from '../socket/WebSocketModel';
import { User } from '../user/User';
import { ChatNetworkModel } from './ChatNetworkModel';

export class ChatNetworkModelImpl implements ChatNetworkModel {
  readonly #privateKey: string;
  readonly #chatRequestFactory = new ChatRequestFactory();
  #socket: SocketModel;
  #onRefreshMyProfile: TypeCallback<Profile>;
  #onUpdateLink: TypeCallback<UpdateLinkResponse>;
  #onRefreshChatList: TypeCallback<Chat[]>;
  #onRefreshUserList: TypeCallback<User[]>;
  #onNotifcationReceived: TypeCallback<VegaNotification>;
  #onChat: TypeCallback<Chat>;

  constructor(privateKey: string) {
    this.#privateKey = privateKey;
    this.#socket = this.createSocketModel(privateKey);
    this.#onUpdateLink = (_) => {};
    this.#onRefreshChatList = (_) => {};
    this.#onChat = (_) => {};
  }

  isOpen(): boolean {
    return this.#socket.isOpen();
  }

  chat(chat: string): void {
    const request = this.#chatRequestFactory
      .getRequest(chat)
      .toRawChatRequest();
    this.#socket.send({
      commandType: 'chat',
      resource: {
        userKey: this.#privateKey,
        msg: request.msg,
        type: request.type,
      },
    });
  }

  reaction(chatHash: string, reaction: string): void {
    this.#socket.send({
      commandType: 'reaction',
      resource: { chatHash, reaction },
    });
  }

  notify(to: string): void {
    this.#socket.send({
      commandType: 'notify-user',
      resource: { from: this.#privateKey, to },
    });
  }

  modifyProfile(name: string, icon: string, statusMessage: string): void {
    this.#socket.send({
      commandType: 'modify-profile',
      resource: {
        privateKey: this.#privateKey,
        userInfo: { icon, nickname: name, statusMessage },
      },
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

  setOnNotificationReceivedCallback(
    callback: TypeCallback<VegaNotification>
  ): void {
    this.#onNotifcationReceived = callback;
  }

  setOnChatCallback(callback: TypeCallback<Chat>): void {
    this.#onChat = callback;
  }

  private onRefreshMyProfile(profile: Profile): void {
    this.#onRefreshMyProfile(profile);
  }

  private onUpdateLink(link: UpdateLinkResponse): void {
    this.#onUpdateLink(link);
  }

  private onRefreshChatList(chats: Chat[]): void {
    this.#onRefreshChatList(chats);
  }

  private onChat(chat: Chat): void {
    this.#onChat(chat);
  }

  private createSocketModel(privateKey: string): SocketModel {
    const model = new WebSocketModel(privateKey);
    model.setOnRefreshMyProfileCallback((profile) =>
      this.onRefreshMyProfile(profile)
    );
    model.setOnUpdateLinkCallback((updateLink) =>
      this.onUpdateLink(updateLink)
    );
    model.setOnRefreshChatListCallback((chats) =>
      this.onRefreshChatList(chats)
    );
    model.setOnRefreshUserListCallback((users) =>
      this.#onRefreshUserList(users)
    );
    model.setOnNotificationReceived((notification) =>
      this.#onNotifcationReceived(notification)
    );
    model.setOnChatCallback((chat) => this.onChat(chat));
    return model;
  }
}
