import { ChatNetworkModel } from './ChatNetworkModel';

export class NullChatNetworkModel implements ChatNetworkModel {
  public isOpen(): boolean {
    throw new Error('Method not implemented.');
  }

  public chat(chat: string): void {
    throw new Error('Method not implemented.');
  }

  public notify(to: string): void {
    throw new Error('Method not implemented.');
  }

  public modifyProfile(
    name: string,
    icon: string,
    statusMessage: string
  ): void {
    throw new Error('Method not implemented.');
  }
}
