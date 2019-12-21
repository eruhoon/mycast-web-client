export interface Stream {

    getPlatform(): string;
    getKeyId(): string;
    getIcon(): string;
    getThumbnail(): string;
    getTitle(): string;
    getDescription(): string;
    getUrl(): string;
    getViewer(): number;

    isOnAir(): boolean;
}
