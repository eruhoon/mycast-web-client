export interface SocketModel {
  isOpen(): boolean;
  login(): void;

  send(request: SocketRequest): void;
}

export type SocketRequest =
  | ChatRequest
  | ReactionRequest
  | ModifyProfileRequest
  | NotifyUserRequest;

type ChatRequest = {
  commandType: 'chat';
  resource: {
    userKey: string;
    msg: string;
    type: string;
  };
};

type ReactionRequest = {
  commandType: 'reaction';
  resource: {
    userKey: string;
    chatHash: string;
    reaction: string;
  };
};

type ModifyProfileRequest = {
  commandType: 'modify-profile';
  resource: {
    privateKey: string;
    userInfo: {
      nickname: string;
      icon: string;
      statusMessage: string;
    };
  };
};

type NotifyUserRequest = {
  commandType: 'notify-user';
  resource: {
    from: string;
    to: string;
  };
};
