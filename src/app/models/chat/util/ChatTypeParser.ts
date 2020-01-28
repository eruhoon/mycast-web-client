import { ChatType } from '../ChatType';

export class ChatTypeParser {

    public parse(rawTypeString: string): ChatType {
        switch (rawTypeString) {
            case 'al-ship': return ChatType.AZURLANE_SHIP;
            case 'afreeca': return ChatType.AFREECA;
            case 'cqhero': return ChatType.CRUSADERQUEST_HERO;
            case 'image': return ChatType.IMAGE;
            case 'kakao-clip': return ChatType.KAKAO_CLIP;
            case 'link': return ChatType.LINK;
            case 'champion': return ChatType.LOL_CHAMPION;
            case 'lol': return ChatType.LOL_USER;
            case 'magic-conch': return ChatType.MAGIC_CONCH;
            case 'serious': return ChatType.SERIOUS;
            case 'stream': return ChatType.STREAM;
            case 'chat': return ChatType.TEXT;
            case 'twitch': return ChatType.TWITCH;
            case 'twitch-clip': return ChatType.TWITCH_CLIP;
            case 'youtube': return ChatType.YOUTUBE;
            default: return ChatType.TEXT;
        }
    }
}