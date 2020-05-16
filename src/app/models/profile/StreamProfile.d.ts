export interface StreamProfile {
    getPlatform(): string;
    getBackgroundImage(): string;
    getLocalId(): string;
    getAfreecaId(): string;
    getTwitchId(): string;
    getMixerId(): string;
}
