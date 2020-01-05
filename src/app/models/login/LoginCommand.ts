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
        this.mSuccess = () => { };
        this.mFailure = () => { };
    }

    public onSuccess(success: TypeCallback<LoginResponse>) {
        this.mSuccess = success;
    }

    public onFailure(failure: Callback) {
        this.mFailure = failure;
    }

    public execute() {
        const url = 'http://mycast.xyz:3000/auth';
        const request = Axios.post<LoginResponse>(url, qs.stringify({
            mcid: this.mId,
            mcpw: this.mPassword
        }));

        request.then(res => {
            const loginResponse = res.data;
            this.mSuccess(loginResponse);
        }).catch(reason => {
            console.log(reason);
            this.mFailure();
        });
    }
}

type LoginResponse = {
    result: boolean,
    sid: string,
    hash: string,
    message: string,
};
