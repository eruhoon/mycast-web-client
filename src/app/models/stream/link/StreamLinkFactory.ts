export class StreamLinkFactory {

    public createLink(streamPlatform: string, keyId: string): string {
        switch (streamPlatform) {
            case 'local': return `//mycast.xyz/player/${keyId}`;
            case 'twitch':
                return `//player.twitch.tv/?channel=${keyId}&parent=${location.hostname}`;
            case 'afreeca': return `http://play.afreecatv.com/${keyId}/embed`;
            case 'kakaotv': return `//tv.kakao.com/embed/player/livelink/${keyId}`;
        }
        return '';
    }

}
