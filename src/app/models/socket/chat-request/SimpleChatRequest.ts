import { RawChatRequest } from '../VegaChatSocketModel';
import { ChatRequest } from './ChatRequest';

export class SimpleChatRequest implements ChatRequest {

    private mType: string;
    private mMessage: string;

    public constructor(type: string, message: string) {
        this.mType = type;
        this.mMessage = message;
    }

    public toRawChatRequest(): RawChatRequest {
        return {
            msg: this.mMessage,
            type: this.mType
        };
    }
}
