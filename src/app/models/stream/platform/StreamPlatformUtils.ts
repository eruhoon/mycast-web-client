export class StreamPlatformUtils {
  public static getIcon(streamPlatform: string): string {
    const dir = `assets/image/stream`;
    switch (streamPlatform) {
      case 'local':
        return `/${dir}/mycast.png`;
      case 'totoro':
      case 'twitch':
      case 'afreeca':
      case 'kakaotv':
      case 'youtube':
        return `/${dir}/${streamPlatform}.png`;
      default:
        return '';
    }
  }
}
