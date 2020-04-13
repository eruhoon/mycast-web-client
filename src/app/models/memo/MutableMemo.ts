import { Memo } from './Memo';

export class MutableMemo implements Memo {

    private readonly mHash: string;
    private mBody: string;

    public constructor(hash: string) {
        this.mHash = hash;
    }

    public static createWithMemo(memo: Memo): MutableMemo {
        const newMemo = new MutableMemo(memo.getHash());
        newMemo.setBody(memo.getBody());
        return newMemo;
    }

    public getHash(): string {
        return this.mHash;
    }

    public getBody(): string {
        return this.mBody;
    }

    public setBody(body: string): void {
        this.mBody = body;
    }
}
