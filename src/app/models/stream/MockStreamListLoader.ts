import { StreamListLoader } from './StreamListLoader';
import { OnLoadCallback } from '../loader/AsyncLoader';
import { Stream } from './Stream';
import { MutableStream } from './MutableStream';

export class MockStreamListLoader implements StreamListLoader {

    public load(callback: OnLoadCallback<Stream[]>): void {
        const streams: Stream[] = [];
        const stream = new MutableStream();
        stream.setIcon('https://i.imgur.com/KUbNw6O.gif');
        stream.setThumbnail('https://i.imgur.com/5hgzZcl.gif');
        streams.push(stream);
        const stream2 = new MutableStream();
        stream2.setIcon('');
        streams.push(stream2);

        callback(streams);
    }
}