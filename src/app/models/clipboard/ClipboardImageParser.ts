import { TypeCallback } from '../common/callback/TypeCallback';

export class ClipboardImageParser {

    public parseImageFile(rawData: DataTransfer | null): File | null {
        if (!rawData || !rawData.files || !rawData.files.item(0)) {
            console.log(rawData);
            console.warn('no data');
            return null;
        }
        const file = rawData.files.item(0);
        if (!file || file.type.indexOf('image') === -1) {
            console.warn('no image');
            return null;
        }
        return file;
    }

    public parseImageUrl(
        rawData: DataTransfer | null, callback: TypeCallback<string | null>) {

        if (!rawData || !rawData.items || !rawData.items[0]) {
            console.log(rawData);
            console.warn('no data');
            callback(null);
        } else {
            // tslint:disable-next-line: prefer-for-of
            for (let i = 0; i < rawData.items.length; i++) {
                const item = rawData.items[i];
                if (item.type === 'text/plain') {
                    return new Promise<string>(resolve => {
                        item.getAsString(link => {
                            callback(link);
                        });
                    });
                }
                return;
            }
            callback(null);
        }

    }
}
