import Axios from 'axios';
import * as qs from 'querystring';

export class LogoutCommand {
  private mSessionId: string;

  public constructor(sessionId: string) {
    this.mSessionId = sessionId;
  }

  public execute() {
    const url = 'http://mycast.xyz:3000/auth';
    const request = Axios.delete(url);

    request
      .then((res) => {
        console.log(res.data);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
}

type LogoutResponse = {
  result: boolean;
  hash: string;
  message: string;
};
