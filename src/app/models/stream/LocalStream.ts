import { Stream } from './Stream';

export class LocalStream extends Stream {
    getPlatform(): string {
        return '';
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
