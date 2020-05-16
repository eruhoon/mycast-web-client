import Axios from 'axios';

export class ModifyStreamCommand {
    private mPrivKey: string;

    public constructor(privKey: string) {
        this.mPrivKey = privKey;
    }

    public async execute(
        platform: string, backgroundImage: string, afreecaId: string,
        twitchId: string, mixerId: string): Promise<boolean> {

        const url = this.getUrl();
        try {
            const form = {
                platform, backgroundImage,
                afreecaId, twitchId, mixerId
            };
            const { data } = await Axios.put<PutStreamDto>(url, form);
            return data.result;
        } catch {
            return false;
        }
    }

    private getUrl(): string {
        return `http://api.mycast.xyz/user/${this.mPrivKey}/stream`;
    }
}

type PutStreamDto = {
    result: boolean
};