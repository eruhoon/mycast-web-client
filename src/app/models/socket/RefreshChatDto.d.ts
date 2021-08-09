import { RefreshChatMessage } from './VegaChatSocketModel';

export type RefreshChatDto = {
  hash: string;
  icon: string;
  level: number;
  type: string;
  msg: RefreshChatMessage;
  nickname: string;
  isMobile: boolean;
  reactions?: RefreshReactionDto[];
  timestamp: string;
};

export type RefreshReactionDto = {
  user: {
    hash: string;
    icon: string;
    nickname: string;
  };
  value: string;
};
