export class LocalStorage {

    private static sInstance: LocalStorage | null = null;

    private static OPTION_TRUE = 'true';
    private static OPTION_FALSE = 'false';

    private constructor() {
    }

    public static getInstance(): LocalStorage {
        if (this.sInstance === null) {
            this.sInstance = new LocalStorage();
        }
        return this.sInstance;
    }

    public getDataSaveMode(): boolean {
        const rawDataSaveMode = this.getItem(LocalStorageKey.DATA_SAVE_MODE);
        return rawDataSaveMode === LocalStorage.OPTION_TRUE;
    }

    public setDataSaveMode(value: boolean): void {
        this.setItem(LocalStorageKey.DATA_SAVE_MODE, value ?
            LocalStorage.OPTION_TRUE : LocalStorage.OPTION_FALSE);
    }

    public getScrollLockMode(): boolean {
        const rawScrollLockMode =
            this.getItem(LocalStorageKey.SCROLL_LOCK_MODE);
        return rawScrollLockMode === LocalStorage.OPTION_TRUE;
    }

    public setScrollLockMode(value: boolean): void {
        this.setItem(LocalStorageKey.SCROLL_LOCK_MODE, value ?
            LocalStorage.OPTION_TRUE : LocalStorage.OPTION_FALSE);
    }

    private getItem(key: LocalStorageKey): string | null {
        return localStorage.getItem(key.toString());
    }

    private setItem(key: LocalStorageKey, value: string): void {
        localStorage.setItem(key.toString(), value);
    }

    private clear(): void {
        localStorage.clear();
    }
}

enum LocalStorageKey {
    DATA_SAVE_MODE = 'vega.data_save_mode',
    SCROLL_LOCK_MODE = 'vega.scroll_lock_mode',
}
