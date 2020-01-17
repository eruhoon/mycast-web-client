import { ChatType } from '../ChatType';

export class ChatTypeParser {

    public parse(typeString: string): ChatType {
        switch (typeString) {
            case 'chat': return ChatType.TEXT;
            case 'image': return ChatType.IMAGE;
            case 'twitch': return ChatType.TWITCH;
            case 'link': return ChatType.LINK;
            default: return ChatType.TEXT;
        }
    }
}
