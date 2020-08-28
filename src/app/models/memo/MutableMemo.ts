import { Memo } from './Memo';

export class MutableMemo implements Memo {
  private readonly mHash: string;
  private mUserName: string;
  private mUserIcon: string;
  private mBody: string;
  private mRegDate: Date;

  public constructor(hash: string) {
    this.mHash = hash;
    this.mUserName = '';
    this.mUserIcon = '';
    this.mRegDate = new Date(0);
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

  public getUserName(): string {
    return this.mUserName;
  }

  public setUserName(name: string): void {
    this.mUserName = name;
  }

  public getUserIcon(): string {
    return this.mUserIcon;
  }

  public setUserIcon(icon: string): void {
    this.mUserIcon = icon;
  }

  public getRegDate(): Date {
    return this.mRegDate;
  }

  public setRegDate(regDate: Date): void {
    this.mRegDate = regDate;
  }

  public static createWithMemo(memo: Memo): MutableMemo {
    const newMemo = new MutableMemo(memo.getHash());
    newMemo.setBody(memo.getBody());
    newMemo.setUserName(memo.getUserName());
    newMemo.setUserIcon(memo.getUserIcon());
    newMemo.setRegDate(memo.getRegDate());
    return newMemo;
  }
}
