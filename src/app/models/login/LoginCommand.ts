import Axios from 'axios';
import * as qs from 'querystring';

export class LoginCommand {

    private mId: string;
    private mPassword: string;

    public constructor(id: string, password: string) {
        this.mId = id;
        this.mPassword = password;
    }

    public execute() {
        const url = 'http://mycast.xyz:3000/auth';
        const request = Axios.post(url, qs.stringify({
            mcid: this.mId,
            mcpw: this.mPassword
        }));

        request.then(res => {
            console.log(res.data);
        }).catch(reason => {
            console.log(reason);
        });
    }
}

type LoginResponse = {
    result: boolean,
    hash: string,
    message: string,
};
