import Axios from 'axios';
import * as qs from 'querystring';

import { SessionStorage } from '../../storage/SessionStorage';
import { Photo } from '../Photo';

export class PhotoTagCommand {

    private mPhoto: Photo;

    public constructor(photo: Photo) {
        this.mPhoto = photo;
    }

    public execute(tags: string) {
        const host = '//api.mycast.xyz';
        const url = `${host}/photo/${this.mPhoto.getHash()}/tags`;
        const privKey = SessionStorage.getInstance().getPrivateKey();
        Axios.post(url, qs.stringify({ user: privKey, msg: tags }));
    }

}
