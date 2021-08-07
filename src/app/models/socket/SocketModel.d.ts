export interface SocketModel {
  isOpen(): boolean;
  login(): void;
  chat(chat: string): void;
  notify(to: string): void;
  modifyProfile(name: string, icon: string, statusMessage: string): void;

  send(request: SocketRequest): void;
}

export type SocketRequest = ReactionRequest;

export type ReactionRequest = {
  commandType: 'reaction';
  resource: {
    chatHash: string;
    reaction: string;
  };
};
