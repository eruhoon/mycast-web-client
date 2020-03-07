import { Chat } from './Chat';
import { ChatSender } from './ChatSender';
import { MutableChat } from './MutableChat';
import { MutableChatMessage } from './MutableChatMessage';

export class ChatContianer {

    private static readonly CHAT_CAPACITY = 50;

    private mChats: MutableChat[];

    public constructor(chats: Chat[]) {
        this.mChats = [];
        chats.forEach(chat => this.addChat(chat));
    }

    private static createMutableChat(chat: Chat): MutableChat {
        const mutableChat = new MutableChat();
        mutableChat.setHash(chat.getHash());
        mutableChat.setIcon(chat.getSender().getIcon());
        mutableChat.setLevel(chat.getSender().getLevel());
        mutableChat.setNickname(chat.getSender().getNickname());
        chat.getMessages().forEach(message => {
            const mutableMessage = new MutableChatMessage();
            mutableMessage.setType(message.getType());
            mutableMessage.setMessage(message.getMessage());

            mutableChat.addMessage(mutableMessage);
        });
        return mutableChat;
    }

    private static isSameSender(s1: ChatSender, s2: ChatSender): boolean {
        return s1.getHash() === s2.getHash() &&
            s1.getIcon() === s2.getIcon() &&
            s1.getLevel() === s2.getLevel() &&
            s1.getNickname() === s2.getNickname();
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

    public toArray(): Chat[] {
        return this.mChats;
    }
}
