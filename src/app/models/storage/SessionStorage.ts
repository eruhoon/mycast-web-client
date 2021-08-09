export class SessionStorage {
  private static sInstance: SessionStorage | null = null;

  constructor() {}

  getSessionId(): string | null {
    return this.getItem(SessionStorageKey.SESSION_ID);
  }

  setSessionId(id: string): void {
    this.setItem(SessionStorageKey.SESSION_ID, id);
  }

  getPrivateKey(): string | null {
    return this.getItem(SessionStorageKey.PRIVATE_KEY);
  }

  setPrivateKey(privateKey: string): void {
    this.setItem(SessionStorageKey.PRIVATE_KEY, privateKey);
  }

  static getInstance(): SessionStorage {
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
