import { User } from './User';

export class MutableUser implements User {

    private mHash: string;
    private mName: string;

    public constructor(hash: string) {
        this.mHash = hash;
    }

    public setName(name: string): void {
        this.mName = name;
    }

    public getName(): string {
        return this.mName;
    }

}
