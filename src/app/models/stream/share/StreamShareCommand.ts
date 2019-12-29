import Axios from 'axios';
import * as qs from 'querystring';

import { Stream } from '../Stream';

export class StreamShareCommand {

    private mStream: Stream;

    public constructor(stream: Stream) {
        this.mStream = stream;
    }
    public execute() {
        const url = 'http://mycast.xyz:8001/stream/';
        // TODO: implement user priv-hash
        const user = 'user-priv-hash';
        const msg = JSON.stringify({
            keyId: this.mStream.getKeyId(),
            icon: this.mStream.getIcon(),
            nickname: this.mStream.getTitle(),
            platform: this.mStream.getPlatform(),
            description: this.mStream.getDescription(),
            thumbnail: this.mStream.getThumbnail(),
            viewer: this.mStream.getViewer()
        });
        Axios.post(url, qs.stringify({ user, msg }));
    }
}
