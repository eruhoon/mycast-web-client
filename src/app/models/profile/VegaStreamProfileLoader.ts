import Axios from 'axios';

import { StreamProfile } from './StreamProfile';

export class VegaStreamProfileLoader {

    private mPrivateKey: string;

    public constructor(privKey: string) {
        this.mPrivateKey = privKey;
    }

    public async load(): Promise<StreamProfile> {
        const url = this.getUrl();
        const { data } = await Axios.get<UserStreamDto>(url);
        return new UserStreamDtoAdapter(data);
    }

    private getUrl(): string {
        return `//api.mycast.xyz/user/${this.mPrivateKey}/stream`;
    }
}

type UserStreamDto = {
    platform: string,
    backgroundImage: string,
    localId: string,
    afreecaId: string,
    twitchId: string,
    mixerId: string,
};

class UserStreamDtoAdapter implements StreamProfile {
    constructor(private mStream: UserStreamDto) { }
    public getPlatform(): string { return this.mStream.platform; }
    public getBackgroundImage(): string { return this.mStream.backgroundImage; }
    public getLocalId(): string { return this.mStream.localId; }
    public getAfreecaId(): string { return this.mStream.afreecaId; }
    public getTwitchId(): string { return this.mStream.twitchId; }
    public getMixerId(): string { return this.mStream.mixerId; }
}
