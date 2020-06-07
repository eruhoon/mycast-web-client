export type NotificationChannel = {
    hash: string,
    name: string,
    browser: boolean,
    os: boolean,
};

export const enum NotificationChannelHash {
    DEFAULT = 'default',
    ALARM = 'alarm',
    LOCAL_STREAM = 'local-stream',
}
