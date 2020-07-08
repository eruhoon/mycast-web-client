import Axios from 'axios';

export class StageStreamCommand {

    private mPlatform: string;
    private mKeyId: string;

    public constructor(pf: string, keyId: string) {
        this.mPlatform = pf;
        this.mKeyId = keyId;
    }

    public async execute(): Promise<StagedStream | null> {
        const host = 'https://mycast.xyz:9011';
        const url = `${host}/stream/${this.mPlatform}/${this.mKeyId}`;
        try {
            const { data } = await Axios.get<StagedStream>(url);
            if (!data) {
                return null;
            }
            return data;
        } catch (e) {
            console.error('unknown error', e);
            return null;
        }
    }

}


