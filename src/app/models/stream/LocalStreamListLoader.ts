import Axios from 'axios';

import { OnLoadCallback } from '../loader/AsyncLoader';
import { MutableStream } from './MutableStream';
import { Stream } from './Stream';
import { StreamListLoader } from './StreamListLoader';

export class LocalStreamListLoader implements StreamListLoader {
    public load(callback: OnLoadCallback<Stream[]>): void {
        Axios.get('https://mycast.xyz:9000/local/').then(rawResult => {
            const rawStreams: RawStream[] = rawResult.data;
            callback(rawStreams.map(raw => {
                const stream: MutableStream = new MutableStream();
                stream.setPlatform(raw.platform);
                stream.setKeyId(raw.keyid);
                stream.setIcon(raw.icon);
                stream.setTitle(raw.title);
                stream.setDescription(raw.description);
                stream.setUrl(raw.url);
                stream.setOnAir(raw.onair);
                stream.setViewer(raw.viewer);
                stream.setThumbnail(raw.thumbnail);
                return stream;
            }));

        }).catch(_ => {
            callback([]);
        });
    }
}

type RawStream = {
    result: true,
    platform: string,
    keyid: string,
    icon: string,
    nickname: string,
    title: string,
    description: string,
    url: string,
    onair: boolean,
    viewer: number,
    thumbnail: string,
};
