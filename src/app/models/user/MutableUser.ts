import { User } from './User';

export class MutableUser implements User {

    private mHash: string;
    private mName: string;
    private mIcon: string;
    private mLevel: number;
    private mComputer: boolean;
    private mMobile: boolean;

    public constructor(hash: string) {
        this.mHash = hash;
    }

    public getHash(): string {
        return this.mHash;
    }

    public setName(name: string): void {
        this.mName = name;
    }

    public getName(): string {
        return this.mName;
    }

    public setIcon(icon: string): void {
        this.mIcon = icon;
    }

    public getIcon(): string {
        return this.mIcon;
    }

    public setLevel(level: number): void {
        this.mLevel = level;
    }

    public getLevel(): number {
        return this.mLevel;
    }

    public setComputer(computuer: boolean): void {
        this.mComputer = computuer;
    }

    public setMobile(mobile: boolean): void {
        this.mMobile = mobile;
    }

    public isComputer(): boolean {
        return this.mComputer;
    }

    public isMobile(): boolean {
        return this.mMobile;
    }

}
