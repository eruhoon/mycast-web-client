import { TypeCallback } from '../common/callback/TypeCallback';
import Axios from 'axios';

export class ClipboardManager {

    public uploadImageCache(
        rawData: DataTransfer | null, callback: TypeCallback<string>): void {

        const file = this.parseImageFile(rawData);
        if (!file) return;
        this.uploadImageCacheWithFile(file, imageUri => {
            callback(imageUri);
        });
    }

    public parseImageFile(rawData: DataTransfer | null): File | null {
        if (!rawData || !rawData.items) return null;
        const items = rawData.items;

        let blob: File | null = null;
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
                blob = item.getAsFile();
            }
        }
        return !blob ? null : blob;
    }

    private uploadImageCacheWithFile(
        file: File, callback: TypeCallback<string>): void {

        const formData = new FormData();
        formData.append('image', file);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        Axios.post('http://mycast.xyz:8001/cache', formData, config).then(res => {
            if (res.status !== 200 || !res.data) {
                return;
            }
            let imageUri = res.data;
            callback(imageUri);
        });
    }
}
