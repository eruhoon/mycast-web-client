import { Md5 } from 'ts-md5';

import { Toast } from './Toast';

export abstract class BaseToast implements Toast {

    private mHash: string;

    public constructor() {
        this.mHash = BaseToast.generateHash();
    }

    public getHash(): string {
        return this.mHash;
    }

    public abstract getText(): string;

    private static generateHash(): string {
        const key = `vega-toast-${new Date().getTime()}`;
        return Md5.hashStr(key).toString();
    }
}
