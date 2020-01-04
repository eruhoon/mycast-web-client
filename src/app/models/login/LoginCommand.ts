import Axios from 'axios';
import * as qs from 'querystring';

import { Callback } from '../common/callback/Callback';

export class LoginCommand {

    private mId: string;
    private mPassword: string;
    private mSuccess: Callback;
    private mFailure: Callback;

    public constructor(id: string, password: string) {
        this.mId = id;
        this.mPassword = password;
        this.mSuccess = () => { };
        this.mFailure = () => { };
    }

    public onSuccess(success: Callback) {
        this.mSuccess = success;
    }

    public onFailure(failure: Callback) {
        this.mFailure = failure;
    }

    public execute() {
        const url = 'http://mycast.xyz:3000/auth';
        const request = Axios.post(url, qs.stringify({
            mcid: this.mId,
            mcpw: this.mPassword
        }));

        request.then(res => {
            console.log(res.data);
            this.mSuccess();
        }).catch(reason => {
            console.log(reason);
            this.mFailure();
        });
    }
}

type LoginResponse = {
    result: boolean,
    hash: string,
    message: string,
};
