import { ChatRequestFactory } from './chat-request/ChatRequestFactory';
import { RefreshChatDto } from './RefreshChatDto';
import { SocketModel } from './SocketModel';

export abstract class VegaChatSocketModel implements SocketModel {
  private mChatRequestFactory: ChatRequestFactory;

  public constructor() {
    this.mChatRequestFactory = new ChatRequestFactory();
  }

  public abstract isOpen(): boolean;
  public abstract login(): void;
  public abstract modifyProfile(
    name: string,
    icon: string,
    statusMessage: string
  ): void;

  protected abstract onRefreshMyProfile(profile: RefreshMyProfile): void;
  protected abstract onUpdateLink(chatHash: string, link: any): void;
  protected abstract onRefreshUserList(users: RefreshUser[]): void;
  protected abstract onRefreshChatList(chats: RefreshChatDto[]): void;
  protected abstract onNotificationReceived(
    notification: ReceivedNotification
  ): void;
  protected abstract onChat(res): void;
  protected abstract requestChat(request: RawChatRequest): void;
  protected abstract requestNotify(to: string): void;

  public chat(chat: string): void {
    const request = this.mChatRequestFactory.getRequest(chat);
    this.requestChat(request.toRawChatRequest());
  }

  public notify(to: string): void {
    this.requestNotify(to);
  }

  protected onMessage(rawMessage: string | null) {
    if (!rawMessage) {
      console.error('Invalid RawMessage');
      return;
    }

    try {
      const messageData: MessageData = JSON.parse(rawMessage);
      this.onMessageData(messageData);
    } catch (err) {
      console.error(err);
    }
  }

  protected onMessageData(messageData: MessageData) {
    switch (messageData.commandType) {
      case 'applyCurrentUserList':
        this.onRefreshUserList(messageData.response);
        break;
      case 'applyCurrentChatList':
        this.onRefreshChatList(messageData.response);
        break;
      case 'applyNotifyFrom':
        this.onNotificationReceived(messageData.response);
        break;
      case 'chat':
        this.onChat(messageData.response);
        break;
      case 'applyMyStatus':
        this.onRefreshMyProfile(messageData.response);
        break;
      case 'link-update':
        this.onUpdateLink(messageData.request, messageData.response);
        break;
      default:
    }
  }
}

type MessageData = {
  commandType: string; // TODO: type
  request: any;
  response: any;
};

export type ReceivedNotification = {
  from: { icon: string; nickname: string };
  timestamp: number;
};

export type RefreshMyProfile = {
  coin: number;
  exp: number;
  icon: string;
  iconBorderColor: string;
  level: number;
  need: number;
  nickname: string;
  statusMessage: string;
};

export type RefreshUser = {
  channelList: string[];
  computer: boolean;
  hash: string;
  icon: string;
  level: number;
  mobile: boolean;
  nickname: string;
};

export type RefreshChatMessage = {
  request: string;
  response: string;
};

export type RawChatRequest = {
  msg: string;
  type: string;
};

/*
hash: "2b07dda6bbdd6531c07977e754a0b898ad5b890a499c4960d5d3408783405bbe"
icon: "https://i.imgur.com/wtClNPW.png"
iconBorderColor: "E8E8E8"
isMobile: false
level: 42
msg: {request: "https://i.imgur.com/6vZAKpf.jpg", response: "https://i.imgur.com/6vZAKpf.jpg"}
nickname: "백수의 사자 양"
timestamp: "Tue Jan 07 2020 22:33:07 GMT+0900 (GMT+09:00)"
type: "image"*/
