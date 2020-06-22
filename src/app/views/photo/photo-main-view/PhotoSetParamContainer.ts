import { PhotoSetParam } from './PhotoSetParam';
import { Photo } from 'src/app/models/photo/Photo';
import { DateUtils } from 'src/app/models/util/DateUtils';

export class PhotoSetParamContainer {

    private mPhotoSets: PhotoSetParam[];

    public constructor() {
        this.mPhotoSets = [];
    }

    public getPhotoSets(): PhotoSetParam[] {
        return this.mPhotoSets;
    }

    public update(photos: Photo[]): void {
        this.mPhotoSets = [];
        this.applyPhoto(photos);
    }

    public upsert(photos: Photo[]): void {
        this.applyPhoto(photos);
    }

    private applyPhoto(photos: Photo[]): void {
        photos.forEach(photo => {
            const dateString = DateUtils.getDateString(photo.getRegDate());
            let photoSetParam = this.mPhotoSets.find(
                set => set.dateString === dateString);

            if (!photoSetParam) {
                photoSetParam = this.createPhotoSetParam(dateString);
                this.mPhotoSets.push(photoSetParam);
            }

            const photoList = photoSetParam.list;
            if (photoList.every(p => p.getHash() !== photo.getHash())) {
                photoList.push(photo);
                photoList.sort(
                    (a, b) => b.getRegDate().getTime() - a.getRegDate().getTime());
            }
        });
    }

    private createPhotoSetParam(dateString: string): PhotoSetParam {
        return { dateString, list: [] };
    }
}
