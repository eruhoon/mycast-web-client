import { OptionSerializable } from '../../storage/OptionSerializable';

export class FavoriteStream implements OptionSerializable<string> {

    private mPlatform: string;
    private mKeyId: string;

    public constructor(platform: string, keyId: string) {
        this.mPlatform = platform;
        this.mKeyId = keyId;
    }

    public getPlatform(): string { return this.mPlatform; }

    public getKeyId(): string { return this.mKeyId; }

    public toOption(): string {
        return JSON.stringify({
            platform: this.getPlatform(),
            keyId: this.getKeyId(),
        });
    }

    public static fromOption(option: string): FavoriteStream | null {
        try {
            const { platform, keyId } = JSON.parse(option);
            return new FavoriteStream(platform, keyId);
        } catch {
            console.error('parse error');
            return null;
        }
    }
}
