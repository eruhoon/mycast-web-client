import { ChatType } from '../ChatType';

export class ChatTypeParser {
  public parse(rawTypeString: string): ChatType {
    switch (rawTypeString) {
      case 'al-ship':
        return ChatType.AZURLANE_SHIP;
      case 'afreeca':
        return ChatType.AFREECA;
      case 'animation':
        return ChatType.ANIMATION;
      case 'book':
        return ChatType.BOOK;
      case 'character-voice':
        return ChatType.CHARACTER_VOICE;
      case 'cqhero':
        return ChatType.CRUSADERQUEST_HERO;
      case 'general-purpose-card':
        return ChatType.GENERAL_PURPOSE_CARD;
      case 'general-purpose-carousel':
        return ChatType.GENERAL_PURPOSE_CAROUSEL;
      case 'gf-doll':
        return ChatType.GIRLS_FRONTLINE_DOLL;
      case 'image':
        return ChatType.IMAGE;
      case 'kakao-clip':
        return ChatType.KAKAO_CLIP;
      case 'link':
        return ChatType.LINK;
      case 'movie':
        return ChatType.MOVIE;
      case 'champion':
        return ChatType.LOL_CHAMPION;
      case 'lol':
        return ChatType.LOL_USER;
      case 'magic-conch':
        return ChatType.MAGIC_CONCH;
      case 'serious':
        return ChatType.SERIOUS;
      case 'stream':
        return ChatType.STREAM;
      case 'chat':
        return ChatType.TEXT;
      case 'twitch':
        return ChatType.TWITCH;
      case 'twitch-clip':
        return ChatType.TWITCH_CLIP;
      case 'twitch-video':
        return ChatType.TWITCH_VIDEO;
      case 'youtube':
        return ChatType.YOUTUBE;
      default:
        console.warn('unknown type: ' + rawTypeString);
        return ChatType.TEXT;
    }
  }
}
