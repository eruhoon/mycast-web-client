import Axios from 'axios';

import { TypeCallback } from '../common/callback/TypeCallback';
import { ClipboardImageParser } from './ClipboardImageParser';

export class ClipboardManager {

    private mClipboardImageParser: ClipboardImageParser;

    public constructor() {
        this.mClipboardImageParser = new ClipboardImageParser();
    }

    public uploadImageCache(
        rawData: DataTransfer | null, callback: TypeCallback<string>): void {

        const file = this.mClipboardImageParser.parseImageFile(rawData);
        if (!file) {
            return;
        }
        this.uploadImageCacheWithFile(file, imageUri => {
            callback(imageUri);
        });
    }

    public uploadImageCacheWithFile(
        file: File, callback: TypeCallback<string>): void {

        const formData = new FormData();
        formData.append('image', file);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };

        Axios.post('https://mycast.xyz:8002/cache', formData, config).then(res => {
            if (res.status !== 200 || !res.data) {
                return;
            }
            const imageUri = res.data;
            callback(imageUri);
        });
    }
}
