import { Chat } from '../Chat';
import { ChatSender } from '../ChatSender';
import { MutableChat } from '../MutableChat';
import { MutableChatMessage } from '../MutableChatMessage';

export class ChatMerger {


    public mergeChats(chats: Chat[]): Chat[] {
        const mergedChats: Chat[] = [];
        chats.forEach(currentChat => {
            const prevChat = mergedChats.pop();
            if (!prevChat) {
                mergedChats.push(currentChat);
            } else {
                const prevSender = prevChat.getSender();
                const currentSender = currentChat.getSender();

                if (this.isSameSender(currentSender, prevSender)) {
                    const mergedChat = this.mergeMessages(prevChat, currentChat);
                    mergedChats.push(mergedChat);
                } else {
                    mergedChats.push(prevChat);
                    mergedChats.push(currentChat);
                }
            }
        });
        return mergedChats;
    }

    public mergeMessages(from: Chat, src: Chat): Chat {
        const merged = new MutableChat();
        merged.setHash(from.getHash());
        merged.setNickname(from.getSender().getNickname());
        merged.setLevel(from.getSender().getLevel());
        merged.setIcon(from.getSender().getIcon());

        from.getMessages().forEach(chatMessage => {
            merged.addMessage(chatMessage);
        });

        src.getMessages().forEach(chatMessage => {
            merged.addMessage(chatMessage);
        });

        return merged;
    }

    private isSameSender(s1: ChatSender, s2: ChatSender): boolean {
        return s1.getHash() === s2.getHash() &&
            s1.getIcon() === s2.getIcon() &&
            s1.getLevel() === s2.getLevel() &&
            s1.getNickname() === s2.getNickname();
    }

}
