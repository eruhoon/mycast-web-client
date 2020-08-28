import { RawChatRequest } from '../VegaChatSocketModel';

export interface ChatRequest {
  toRawChatRequest(): RawChatRequest;
}
