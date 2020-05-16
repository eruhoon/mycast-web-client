import { ChatRequest } from './ChatRequest';
import { SimpleChatRequest } from './SimpleChatRequest';
import { TextChatRequest } from './TextChatRequest';

export class ChatRequestFactory {

    public getRequest(rawText: string): ChatRequest {

        const regex = /(.*?)::(.*)/;
        const match = regex.exec(rawText);

        if (match === null || match[1] === null || match[2] === null) {
            return new TextChatRequest(rawText);
        }
        const rawType = match[1].trim().toLocaleLowerCase();
        const rawMsg = match[2];
        switch (rawType) {

            case '트위치': case '트타쿠': case 'twitch':
                return new SimpleChatRequest('twitch', rawMsg);

            case '별창': case '아프리카': case 'afreeca':
                return new SimpleChatRequest('afreeca', rawMsg);

            case '책': case '도서': case 'book':
                return new SimpleChatRequest('book', rawMsg);

            case '포토': case '사진': case '이미지':
            case 'photo': case 'image':
                return new SimpleChatRequest('image', rawMsg);

            case '궁서': case '엄격': case '진지': case '근엄':
            case 'serious':
                return new TextChatRequest(rawMsg, true);

            case '영화': case 'movie':
                return new SimpleChatRequest('movie', rawMsg);

            case '챔': case '챔프': case '챔피온': case '챔피언':
            case 'champ': case 'champion':
                return new SimpleChatRequest('champion', rawMsg);

            case '롤': case 'lol':
                return new SimpleChatRequest('lol', rawMsg);

            case '애니': case '애니메이션': case 'ani': case 'animation':
                return new SimpleChatRequest('animation', rawMsg);

            case '배박이': case '아주르레인': case '벽람': case '아즈렌':
            case '배': case 'ship': case 'azurlane':
                return new SimpleChatRequest('alship', rawMsg);

            case '소라고둥': case '소라고동': case '고둥': case '고동':
            case 'conch':
                return new SimpleChatRequest('magic-conch', rawMsg);

            case '용사': case '크퀘': case '크퀘영웅': case 'cq':
                return new SimpleChatRequest('cqhero', rawMsg);

            case '소전': case '인형': case '전술인형': case '총박이':
            case '총': case 'gf': case 'gun':
                return new SimpleChatRequest('gf-doll', rawMsg);

            case '성우': case 'cv':
                return new SimpleChatRequest('character-voice', rawMsg);

            case '테스트': case 'test':
                return new SimpleChatRequest('test', rawMsg);

            default:
                return new TextChatRequest(rawText);

            /*case '코인빵':
                msg = parseInt(m[2]);
                if (msg) {
                    this.callCoinBattleCreate(parseInt(m[2]));
                }
                return;*/
        }
    }
}
