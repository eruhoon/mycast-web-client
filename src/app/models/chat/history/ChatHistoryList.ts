import { Chat } from '../Chat';

export class ChatHistoryList {

    private static readonly CAPACITY: number = 10;
    private mChatHistories: Chat[];

    public constructor() {
        this.mChatHistories = [];
    }

    public addHistory(chat: Chat): void {
        this.mChatHistories.push(chat);
        this.mChatHistories = this.mChatHistories.filter(
            (_, i) => i < ChatHistoryList.CAPACITY);
    }

}
