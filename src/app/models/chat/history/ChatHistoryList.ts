import { Chat } from '../Chat';

export class ChatHistoryList {

    private static readonly DEFAULT_INDEX = -1;
    private static readonly CAPACITY: number = 10;
    private mChatHistories: string[];
    private mIndex: number;

    public constructor() {
        this.mChatHistories = [];
        this.mIndex = ChatHistoryList.DEFAULT_INDEX;
    }

    public addHistory(chat: string): void {
        this.mChatHistories.unshift(chat);
        this.mChatHistories = this.mChatHistories.filter(
            (_, i) => i < ChatHistoryList.CAPACITY);
    }

    public getPrev(): string {
        this.mIndex++;
        if (this.mIndex >= this.mChatHistories.length) {
            this.mIndex = this.mChatHistories.length - 1;
            console.warn('oldest history');
        }
        return this.mChatHistories[this.mIndex];
    }

    public getNext(): string {
        this.mIndex--;
        if (this.mIndex < 0) {
            this.mIndex = -1;
            console.warn('latest history');
        }
        return this.mIndex >= 0 ? this.mChatHistories[this.mIndex] : '';
    }

    public isEmpty(): boolean {
        return this.mChatHistories.length === 0;
    }

    public resetIndex(): void {
        this.mIndex = ChatHistoryList.DEFAULT_INDEX;
    }

}
