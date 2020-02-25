import { ChatNetworkModel } from './ChatNetworkModel';

export class NullChatNetworkModel implements ChatNetworkModel {

    public chat(chat: string): void {
        throw new Error('Method not implemented.');
    }

    public modifyProfile(name: string, icon: string): void {
        throw new Error('Method not implemented.');
    }
}
