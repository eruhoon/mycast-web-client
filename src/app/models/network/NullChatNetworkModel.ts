import { ChatNetworkModel } from './ChatNetworkModel';

export class NullChatNetworkModel implements ChatNetworkModel {

    public chat(chat: string): void {
        throw new Error('Method not implemented.');
    }
}
