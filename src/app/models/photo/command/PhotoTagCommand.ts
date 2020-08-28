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
    const host = 'https://mycast.xyz:9011';
    const url = `${host}/photo/${this.mPhoto.getHash()}/tags`;
    const privKey = SessionStorage.getInstance().getPrivateKey();
    Axios.post(url, qs.stringify({ user: privKey, msg: tags }));
  }
}
