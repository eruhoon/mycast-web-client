import { Chat } from '../chat/Chat';
import { TypeCallback } from '../common/callback/TypeCallback';
import { VegaNotification } from '../notification/VegaNotification';
import { Profile } from '../profile/Profile';
import { SocketModel } from '../socket/SocketModel';
import { UpdateLinkResponse, WebSocketModel } from '../socket/WebSocketModel';
import { User } from '../user/User';
import { ChatNetworkModel } from './ChatNetworkModel';

export class ChatNetworkModelImpl implements ChatNetworkModel {
  private mSocket: SocketModel;
  private mOnRefreshMyProfile: TypeCallback<Profile>;
  private mOnUpdateLink: TypeCallback<UpdateLinkResponse>;
  private mOnRefreshChatList: TypeCallback<Chat[]>;
  private mOnRefreshUserList: TypeCallback<User[]>;
  private mOnNotifcationReceived: TypeCallback<VegaNotification>;
  private mOnChat: TypeCallback<Chat>;

  public constructor(privateKey: string) {
    this.mSocket = this.createSocketModel(privateKey);
    this.mOnUpdateLink = (_) => {};
    this.mOnRefreshChatList = (_) => {};
    this.mOnChat = (_) => {};
  }

  public isOpen(): boolean {
    return this.mSocket.isOpen();
  }

  public chat(chat: string): void {
    this.mSocket.chat(chat);
  }

  reaction(chatHash: string, reaction: string): void {
    this.mSocket.send({
      commandType: 'reaction',
      resource: { chatHash, reaction },
    });
  }

  public notify(to: string): void {
    this.mSocket.notify(to);
  }

  public modifyProfile(
    name: string,
    icon: string,
    statusMessage: string
  ): void {
    this.mSocket.modifyProfile(name, icon, statusMessage);
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

  public setOnNotificationReceivedCallback(
    callback: TypeCallback<VegaNotification>
  ): void {
    this.mOnNotifcationReceived = callback;
  }

  public setOnChatCallback(callback: TypeCallback<Chat>): void {
    this.mOnChat = callback;
  }

  private onRefreshMyProfile(profile: Profile): void {
    this.mOnRefreshMyProfile(profile);
  }

  private onUpdateLink(link: UpdateLinkResponse): void {
    this.mOnUpdateLink(link);
  }

  private onRefreshChatList(chats: Chat[]): void {
    this.mOnRefreshChatList(chats);
  }

  private onChat(chat: Chat): void {
    this.mOnChat(chat);
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
      this.mOnRefreshUserList(users)
    );
    model.setOnNotificationReceived((notification) =>
      this.mOnNotifcationReceived(notification)
    );
    model.setOnChatCallback((chat) => this.onChat(chat));
    return model;
  }
}
