import { ChatListService } from 'src/app/views/chat/chat-list/chat-list.service';
import { ChatNetworkModel } from './ChatNetworkModel';

export class ChatCommand {

    public constructor(
        private mChatListSrv: ChatListService,
        private mModel: ChatNetworkModel) {
    }

    public execute(text: string): void {
        this.mModel.chat(text);
        this.mChatListSrv.scrollToBottom(false);
    }
}
