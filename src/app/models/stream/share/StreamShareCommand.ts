import Axios from 'axios';
import * as qs from 'querystring';

import { SessionStorage } from '../../storage/SessionStorage';
import { Stream } from '../Stream';

export class StreamShareCommand {

    private mStream: Stream;

    public constructor(stream: Stream) {
        this.mStream = stream;
    }

    public execute() {
        const url = 'https://mycast.xyz:8002/stream/';
        const privKey = SessionStorage.getInstance().getPrivateKey();
        const msg = JSON.stringify({
            keyId: this.mStream.getKeyId(),
            icon: this.mStream.getIcon(),
            nickname: this.mStream.getTitle(),
            platform: this.mStream.getPlatform(),
            description: this.mStream.getDescription(),
            thumbnail: this.mStream.getThumbnail(),
            link: this.mStream.getUrl(),
            viewer: this.mStream.getViewer(),
        });
        Axios.post(url, qs.stringify({ user: privKey, msg }));
    }
}
