import Axios from 'axios';
import { TypeCallback } from '../common/callback/TypeCallback';

export class JoinCommand {
  public execute(
    id: string,
    pw: string,
    nick: string,
    callback: TypeCallback<boolean>
  ) {
    const url = this.getUri();
    const request = Axios.post<string>(url, this.getBody(id, pw, nick));

    request
      .then((res) => {
        callback(true);
      })
      .catch((reason) => {
        callback(false);
      });
  }

  private getUri(): string {
    return 'https://mycast.xyz:3001/join';
  }

  private getBody(id: string, pw: string, nick: string): string {
    return `vgid=${id}&vgpw=${pw}&vgnick=${nick}`;
  }
}
