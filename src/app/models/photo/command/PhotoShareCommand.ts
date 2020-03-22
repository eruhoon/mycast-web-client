import Axios from 'axios';
import * as qs from 'querystring';

import { SessionStorage } from '../../storage/SessionStorage';
import { Photo } from '../Photo';

export class PhotoShareCommand {

    private mPhoto: Photo;

    public constructor(photo: Photo) {
        this.mPhoto = photo;
    }

    public execute() {
        const url = 'http://mycast.xyz:8001/photo';
        const privKey = SessionStorage.getInstance().getPrivateKey();
        const msg = this.mPhoto.getUrl();
        Axios.post(url, qs.stringify({ user: privKey, msg }));
    }
}
