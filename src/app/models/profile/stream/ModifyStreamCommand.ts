import Axios from 'axios';

export class ModifyStreamCommand {
  private mPrivKey: string;

  public constructor(privKey: string) {
    this.mPrivKey = privKey;
  }

  public async execute(
    platform: string,
    backgroundImage: string,
    afreecaId: string,
    twitchId: string
  ): Promise<boolean> {
    const url = this.getUrl();
    try {
      const form = {
        platform,
        backgroundImage,
        afreecaId,
        twitchId,
      };
      const { data } = await Axios.put<PutStreamDto>(url, form);
      return data.result;
    } catch {
      return false;
    }
  }

  private getUrl(): string {
    return `https://mycast.xyz:9011/user/${this.mPrivKey}/stream`;
  }
}

type PutStreamDto = {
  result: boolean;
};
