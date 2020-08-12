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
        chats.forEach(chat => this.addChat(chat));
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
                src.getMessages().forEach(message => prev.addMessage(message));
                this.mChats.push(prev);
            } else {
                this.mChats.push(prev);
                this.mChats.push(src);
            }
        }

        const length = this.mChats.length;
        this.mChats = this.mChats.filter((_, i) =>
            i >= length - ChatContianer.CHAT_CAPACITY);
    }

    public updateLink(link: UpdateLinkResponse): void {
        const found = this.mChats.find(chat => chat.getHash() === link.chatHash);
        if (!found) {
            console.log('not found');
            return;
        }
        console.log(found);
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
        chat.getMessages().forEach(message => {
            const mutableMessage = new MutableChatMessage();
            mutableMessage.setType(message.getType());
            mutableMessage.setRequest(message.getRequest());
            mutableMessage.setMessage(message.getMessage());
            mutableMessage.setTimestamp(message.getTimestamp());
            mutableChat.addMessage(mutableMessage);
        });
        return mutableChat;
    }

    private static isSameSender(s1: ChatSender, s2: ChatSender): boolean {
        return s1.getHash() === s2.getHash() &&
            s1.getIcon() === s2.getIcon() &&
            s1.getLevel() === s2.getLevel() &&
            s1.getNickname() === s2.getNickname() &&
            s1.getType() === s2.getType();
    }
}
