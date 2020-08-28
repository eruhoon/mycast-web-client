export class SessionStorage {
  private static sInstance: SessionStorage | null = null;

  public constructor() {}

  public getSessionId(): string | null {
    return this.getItem(SessionStorageKey.SESSION_ID);
  }

  public setSessionId(id: string): void {
    this.setItem(SessionStorageKey.SESSION_ID, id);
  }

  public getPrivateKey(): string | null {
    return this.getItem(SessionStorageKey.PRIVATE_KEY);
  }

  public setPrivateKey(privateKey: string): void {
    this.setItem(SessionStorageKey.PRIVATE_KEY, privateKey);
  }

  public static getInstance(): SessionStorage {
    if (this.sInstance === null) {
      this.sInstance = new SessionStorage();
    }
    return this.sInstance;
  }

  private getItem(key: SessionStorageKey): string | null {
    return sessionStorage.getItem(key.toString());
  }

  private setItem(key: SessionStorageKey, value: string): void {
    sessionStorage.setItem(key.toString(), value);
  }

  private clear(): void {
    sessionStorage.clear();
  }
}

enum SessionStorageKey {
  SESSION_ID = 'vega.session_id',
  PRIVATE_KEY = 'vega.priv_key',
}
