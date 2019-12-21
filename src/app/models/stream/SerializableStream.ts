import { Stream } from './Stream';

export abstract class JsonableStream implements Stream {
    abstract getPlatform(): string;
    abstract getKeyId(): string;
    abstract getIcon(): string;
    abstract getThumbnail(): string;
    abstract getTitle(): string;
    abstract getDescription(): string;
    abstract getUrl(): string;
    abstract getViewer(): number;
    abstract isOnAir(): boolean;

    public toJson() {
        return {
            platform: this.getPlatform(),
            keyid: this.getKeyId(),
            icon: this.getIcon(),
            thumbnail: this.getThumbnail(),
            title: this.getTitle(),
            description: this.getDescription(),
            url: this.getDescription(),
            onair: this.isOnAir(),
        }
    }

}
