import { ChatMessage } from './ChatMessage';
import { ChatType } from './ChatType';

export class MutableChatMessage implements ChatMessage {
  private mHash: string;
  private mType: ChatType;
  private mRequest: string;
  private mMessage: string;
  private mTime: Date;

  public constructor(hash: string) {
    this.mHash = hash;
  }

  public getHash(): string {
    return this.mHash;
  }

  public getType(): ChatType {
    return this.mType;
  }

  public getRequest(): string {
    return this.mRequest;
  }

  public getMessage(): string {
    return this.mMessage;
  }

  public getTimestamp(): number {
    return this.mTime.getTime();
  }

  public setType(type: ChatType): void {
    this.mType = type;
  }

  public setRequest(request: string | null): void {
    this.mRequest = request || '';
  }

  public setMessage(message: string | null): void {
    this.mMessage = message || '';
  }

  public setTimestamp(timestamp: number): void {
    this.mTime = new Date(timestamp);
  }
}
