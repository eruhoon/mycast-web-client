export interface AsyncLoader<T> {
    load(callback: OnLoadCallback<T>): void;
}

export type OnLoadCallback<T> = (data: T | null) => void;