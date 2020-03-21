export interface Photo {
    getHash(): string;
    getUrl(): string;
    getWidth(): number;
    getHeight(): number;
    getMimeType(): string;
    getRegDate(): Date;
    isForAdult(): boolean;
}
