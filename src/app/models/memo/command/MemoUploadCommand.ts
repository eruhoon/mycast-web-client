import Axios from 'axios';

export class MemoUploadCommand {

    private mPrivKey: string;

    public constructor(privKey: string) {
        this.mPrivKey = privKey;
    }

    public execute(memo: string): void {
        const url = 'http://api.mycast.xyz/memo';
        const form = {
            userKey: this.mPrivKey,
            text: memo,
        };
        Axios.post(url, form);
    }
}
