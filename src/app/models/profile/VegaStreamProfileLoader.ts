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
        return `http://api.mycast.xyz/user/${this.mPrivateKey}/stream`;
    }
}

type UserStreamDto = {
    platform: string
};

class UserStreamDtoAdapter implements StreamProfile {
    constructor(private mStream: UserStreamDto) { }
    public getPlatform(): string { return this.mStream.platform; }
}
