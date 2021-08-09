import { ChatListService } from 'src/app/views/chat/chat-list/chat-list.service';
import { ChatNetworkModel } from './ChatNetworkModel';

export class ChatCommand {
  #chatListService: ChatListService;
  chatNetwork: ChatNetworkModel;

  constructor(chatListService: ChatListService, model: ChatNetworkModel) {
    this.#chatListService = chatListService;
    this.chatNetwork = model;
  }

  execute(text: string): void {
    this.chatNetwork.chat(text);
    setTimeout(() => {
      this.#chatListService.scrollToBottom(false);
    }, 500);
  }
}
