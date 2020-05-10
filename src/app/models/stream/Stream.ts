export abstract class Stream {

    public abstract getPlatform(): string;
    public abstract getKeyId(): string;
    public abstract getIcon(): string;
    public abstract getThumbnail(): string;
    public abstract getTitle(): string;
    public abstract getDescription(): string;
    public abstract getUrl(): string;
    public abstract getViewer(): number;
    public abstract isOnAir(): boolean;

    public isEquivalent(src: Stream): boolean {
        return this.getPlatform() === src.getPlatform() &&
            this.getKeyId() === src.getKeyId() &&
            this.getIcon() === src.getIcon() &&
            this.getThumbnail() === src.getThumbnail() &&
            this.getTitle() === src.getTitle() &&
            this.getDescription() === src.getDescription() &&
            this.getUrl() === src.getUrl() &&
            this.getViewer() === src.getViewer() &&
            this.isOnAir() === src.isOnAir();
    }
}
