import { Photo } from '../Photo';

export class PhotoAdultFilterCommand {

    private mPhoto: Photo;

    public constructor(photo: Photo) {
        this.mPhoto = photo;
    }

    public execute() {
        console.log(this.mPhoto);
    }
}
