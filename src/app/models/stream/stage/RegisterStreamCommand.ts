import Axios from 'axios';
import * as qs from 'querystring';

export class RegisterStreamCommand {

    private mPlatform: string;
    private mKeyId: string;

    public constructor(pf: string, keyId: string) {
        this.mPlatform = pf;
        this.mKeyId = keyId;
    }

    public async execute(): Promise<boolean> {
        const host = 'https://mycast.xyz:9011';
        const url = `${host}/stream`;
        try {
            const { data } = await Axios.post<Result>(url, qs.stringify({
                platform: this.mPlatform,
                keyId: this.mKeyId,
            }));
            if (!data || !data.result) {
                return false;
            }
            return true;
        } catch (e) {
            console.error('unknown error', e);
            return false;
        }
    }

}

type Result = {
    result: boolean,
    msg: string,
};
