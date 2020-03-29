import Axios from 'axios';
import * as qs from 'querystring';

import { SessionStorage } from '../../storage/SessionStorage';

export class PhotoUploadCommand {

    public constructor(file: File) {
        this.mFile = file;
        this.mReader = new FileReader();
        this.mReader.onload = _ => {
            if (typeof (this.mReader.result) === 'string') {
                const base64 = this.mReader.result || null;
                this.onFileLoad(base64);
            }
        };
    }

    private mFile: File;
    private mReader: FileReader;

    public execute() {
        if (!this.isValidFile()) {
            console.warn('invalid files');
            return;
        }
        this.mReader.readAsDataURL(this.mFile);
    }

    private onFileLoad(base64: string | null): void {
        console.log(base64);

        // const host = 'http://mycast.xyz/home/photo/uploadbase64';
        // const privKey = SessionStorage.getInstance().getPrivateKey();
        // const query = qs.stringify({ b: base64, ukey: privKey });
        /*
        const url = `${host}/photo/${this.mPhoto.getHash()}/tags`;
        const privKey = SessionStorage.getInstance().getPrivateKey();
        Axios.post(url, qs.stringify({ user: privKey, msg: tags }));
        */
    }

    private isValidFile(): boolean {
        if (!this.mFile.type.includes('image')) {
            return false;
        }
        return true;
    }
}
