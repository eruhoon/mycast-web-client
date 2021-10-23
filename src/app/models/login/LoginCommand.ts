import Axios from 'axios';
import * as qs from 'querystring';

import { Callback } from '../common/callback/Callback';
import { TypeCallback } from '../common/callback/TypeCallback';

export class LoginCommand {
  private mId: string;
  private mPassword: string;
  private mSuccess: TypeCallback<LoginResponse>;
  private mFailure: Callback;

  public constructor(id: string, password: string) {
    this.mId = id;
    this.mPassword = password;
    this.mSuccess = () => {};
    this.mFailure = () => {};
  }

  public onSuccess(success: TypeCallback<LoginResponse>) {
    this.mSuccess = success;
  }

  public onFailure(failure: Callback) {
    this.mFailure = failure;
  }

  public async execute() {
    const urls = [
      'https://login.mycast.xyz/auth',
      'https://mycast.xyz:3001/auth',
    ];
    for (let i = 0; i < urls.length; i++) {
      const result = await this.request(urls[i]);
      if (result) {
        this.mSuccess(result);
        return;
      }
    }
    this.mFailure();
  }

  private async request(url: string) {
    try {
      const res = await Axios.post<LoginResponse>(
        url,
        qs.stringify({
          mcid: this.mId,
          mcpw: this.mPassword,
        })
      );
      return res.data;
    } catch {
      return null;
    }
  }

  private getUri(): string {
    return 'https://login.mycast.xyz/auth';
  }
}

type LoginResponse = {
  result: boolean;
  sid: string;
  hash: string;
  message: string;
};
