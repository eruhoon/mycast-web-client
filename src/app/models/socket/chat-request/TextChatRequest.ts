import { RawChatRequest } from '../VegaChatSocketModel';
import { ChatRequest } from './ChatRequest';

export class TextChatRequest implements ChatRequest {

    private mText: string;
    private mSerious: boolean;

    public constructor(text: string, isSerious: boolean = false) {
        this.mText = text;
        this.mSerious = isSerious;
    }

    public toRawChatRequest(): RawChatRequest {
        return {
            msg: this.mText,
            type: 'chat'
        };
    }
}
