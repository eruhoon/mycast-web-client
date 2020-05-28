import Axios from 'axios';
import * as qs from 'querystring';

import { SessionStorage } from '../../storage/SessionStorage';

export class MemoShareCommand {

    private mMemoHash: string;

    public constructor(memoHash: string) {
        this.mMemoHash = memoHash;
    }

    public execute() {
        const url = 'https://mycast.xyz:8002/memo';
        const privKey = SessionStorage.getInstance().getPrivateKey();
        Axios.post(url, qs.stringify({
            user: privKey,
            memoIdx: Number(this.mMemoHash)
        }));
    }

}
