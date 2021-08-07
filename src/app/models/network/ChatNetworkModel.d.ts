export interface ChatNetworkModel {
  isOpen(): boolean;
  chat(chat: string): void;
  reaction(chatHash: string, reaction: string): void;
  notify(to: string): void;
  modifyProfile(name: string, icon: string, statusMessage: string): void;
}
