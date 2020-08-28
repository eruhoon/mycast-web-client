export class Logger {
  private mTag: string;

  public constructor(tag: string) {
    this.mTag = tag;
  }

  public log(str: string) {
    console.log(this.mTag, str);
  }
}
