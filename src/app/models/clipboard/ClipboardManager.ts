import Axios from 'axios';

import { TypeCallback } from '../common/callback/TypeCallback';

export class ClipboardManager {

    public uploadImageCache(
        rawData: DataTransfer | null, callback: TypeCallback<string>): void {

        const file = this.parseImageFile(rawData);
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

    private parseImageFile(rawData: DataTransfer | null): File | null {
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
}
