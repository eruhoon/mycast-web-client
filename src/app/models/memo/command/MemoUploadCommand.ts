import Axios from 'axios';

export class MemoUploadCommand {

    private mPrivKey: string;

    public constructor(privKey: string) {
        this.mPrivKey = privKey;
    }

    public async execute(memo: string): Promise<void> {
        const url = '//api.mycast.xyz/memo';
        const form = {
            userKey: this.mPrivKey,
            text: memo,
        };
        await Axios.post(url, form);
        return;
    }
}
