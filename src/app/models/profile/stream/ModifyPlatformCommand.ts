import Axios from 'axios';

export class ModifyPlatformCommand {

    private mPrivKey: string;

    public constructor(privKey: string) {
        this.mPrivKey = privKey;
    }

    public async execute(platform: string): Promise<boolean> {
        const url = this.getUrl();
        try {
            const { data } = await Axios.put<PutStreamPlatformDto>(url, { platform });
            return data.result;
        } catch {
            return false;
        }
    }

    private getUrl(): string {
        return `http://api.mycast.xyz/user/${this.mPrivKey}/stream/platform`;
    }
}

type PutStreamPlatformDto = {
    result: boolean
};
