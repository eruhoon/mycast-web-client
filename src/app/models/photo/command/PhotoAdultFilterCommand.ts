import Axios from 'axios';
import * as qs from 'querystring';

import { SessionStorage } from '../../storage/SessionStorage';
import { Photo } from '../Photo';

export class PhotoAdultFilterCommand {
  private static readonly TRUE = 'true';
  private static readonly FALSE = 'false';

  private mPhoto: Photo;

  public constructor(photo: Photo) {
    this.mPhoto = photo;
  }

  public async execute(adult: boolean): Promise<boolean> {
    const host = 'https://mycast.xyz:9011';
    const url = `${host}/photo/${this.mPhoto.getHash()}/adult`;
    const privKey = SessionStorage.getInstance().getPrivateKey();

    try {
      const { data } = await Axios.post<Result>(
        url,
        qs.stringify({
          user: privKey,
          msg: adult
            ? PhotoAdultFilterCommand.TRUE
            : PhotoAdultFilterCommand.FALSE,
        })
      );
      return data && data.result === true;
    } catch (e) {
      console.error('unknown error', e);
      return false;
    }
  }
}

type Result = { result: boolean };
