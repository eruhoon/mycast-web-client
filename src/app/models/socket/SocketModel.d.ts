export interface SocketModel {
  isOpen(): boolean;
  login(): void;
  chat(chat: string): void;
  notify(to: string): void;
  modifyProfile(name: string, icon: string): void;
}
