import Axios from 'axios';
import * as qs from 'querystring';

import { SessionStorage } from '../../storage/SessionStorage';
import { Photo } from '../Photo';

export class PhotoAdultFilterCommand {

    private static readonly TRUE = 1;
    private static readonly FALSE = 0;

    private mPhoto: Photo;

    public constructor(photo: Photo) {
        this.mPhoto = photo;
    }

    public execute(adult: boolean) {
        const host = 'http://api.mycast.xyz';
        const url = `${host}/photo/${this.mPhoto.getHash()}/adult`;
        const privKey = SessionStorage.getInstance().getPrivateKey();

        Axios.post(url, qs.stringify({
            user: privKey,
            msg: adult ?
                PhotoAdultFilterCommand.TRUE :
                PhotoAdultFilterCommand.FALSE
        }));
    }
}
