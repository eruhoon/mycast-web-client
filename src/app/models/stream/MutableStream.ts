import { Stream } from './Stream';

export class MutableStream implements Stream {

    private mPlatform: string;

    public constructor() {

    }

    setPlatform(platform: string) {
        this.mPlatform = platform;
    }
    getPlatform(): string {
        return this.mPlatform;
    }
    getKeyId(): string {
        return '';
    }
    getIcon(): string {
        return '';
    }

    getThumbnail(): string {
        return '';
    }

    getTitle(): string {
        return '';
    }
    getDescription(): string {
        return '';
    }
    getUrl(): string {
        return '';
    }
    getViewer(): number {
        return 0;
    }
    isOnAir(): boolean {
        return false;
    }

}
