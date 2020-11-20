import { Chat } from './Chat';
import { ChatSender } from './ChatSender';
import { MutableChat } from './MutableChat';
import { MutableChatMessage } from './MutableChatMessage';
import { UpdateLinkResponse } from '../socket/WebSocketModel';

export class ChatContianer {
  private static readonly CHAT_CAPACITY = 50;

  private mChats: MutableChat[];

  public constructor(chats: Chat[]) {
    this.mChats = [];
    chats.forEach((chat) => this.addChat(chat));
  }

  public addChat(chat: Chat): void {
    const src = ChatContianer.createMutableChat(chat);
    const prev = this.mChats.pop();
    if (!prev) {
      this.mChats.push(src);
    } else {
      const prevSender = prev.getSender();
      const currentSender = src.getSender();

      if (ChatContianer.isSameSender(currentSender, prevSender)) {
        src.getMessages().forEach((message) => prev.addMessage(message));
        this.mChats.push(prev);
      } else {
        this.mChats.push(prev);
        this.mChats.push(src);
      }
    }

    const length = this.mChats.length;
    this.mChats = this.mChats.filter(
      (_, i) => i >= length - ChatContianer.CHAT_CAPACITY
    );
  }

  public updateLink(link: UpdateLinkResponse): void {
    // TODO: optimize
    this.mChats.forEach((chat) => {
      chat.getMessages().forEach((msg, i, arr) => {
        if (msg.getHash() !== link.chatHash) {
          return;
        }
        const orgMessage = JSON.parse(msg.getMessage());
        orgMessage.info.thumbnail = link.thumbnail;
        orgMessage.info.title = link.title;
        const newMessage = new MutableChatMessage(link.chatHash);
        newMessage.setType(msg.getType());
        newMessage.setRequest(msg.getRequest());
        newMessage.setMessage(JSON.stringify(orgMessage));
        newMessage.setTimestamp(msg.getTimestamp());
        arr[i] = newMessage;
      });
    });
  }

  public toArray(): Chat[] {
    return this.mChats;
  }

  private static createMutableChat(chat: Chat): MutableChat {
    const mutableChat = new MutableChat();
    mutableChat.setHash(chat.getHash());
    mutableChat.setIcon(chat.getSender().getIcon());
    mutableChat.setLevel(chat.getSender().getLevel());
    mutableChat.setNickname(chat.getSender().getNickname());
    mutableChat.setSenderType(chat.getSender().getType());
    chat.getMessages().forEach((message) => {
      const mutableMessage = new MutableChatMessage(message.getHash());
      mutableMessage.setType(message.getType());
      mutableMessage.setRequest(message.getRequest());
      mutableMessage.setMessage(message.getMessage());
      mutableMessage.setTimestamp(message.getTimestamp());
      mutableChat.addMessage(mutableMessage);
    });
    return mutableChat;
  }

  private static isSameSender(s1: ChatSender, s2: ChatSender): boolean {
    return (
      s1.getHash() === s2.getHash() &&
      s1.getIcon() === s2.getIcon() &&
      s1.getLevel() === s2.getLevel() &&
      s1.getNickname() === s2.getNickname() &&
      s1.getType() === s2.getType()
    );
  }
}
