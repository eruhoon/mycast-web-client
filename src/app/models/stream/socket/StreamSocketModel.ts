import * as io from 'socket.io-client';

import { SessionStorage } from '../../storage/SessionStorage';
import { StreamDto } from '../StreamDto';

export class StreamSocketModel {

    private static readonly SOCKET_HOST: string = 'https://mycast.xyz:9000';

    private mSocket: SocketIOClient.Socket;
    private mLocalStreamDtos: StreamDto[];
    private mExternalStreamDtos: StreamDto[];

    public constructor() {
        this.mSocket = StreamSocketModel.createSocket();
        this.mSocket.on('connect', () => { console.log('connected'); });
        this.mSocket.on('refresh_streams', (raw: RefreshStreamDto) => {
            this.onRefreshStreams(raw);
        });
    }

    private static createSocket(): SocketIOClient.Socket {
        const privateKey = SessionStorage.getInstance().getPrivateKey();
        const option = { query: `key=${privateKey}` };

        return io.connect(this.SOCKET_HOST, option);
    }

    public getLocalStreamDtos(): StreamDto[] {
        return this.mLocalStreamDtos;
    }

    public getExternalStreamDtos(): StreamDto[] {
        return this.mExternalStreamDtos;
    }

    private onRefreshStreams(refreshStreamDto: RefreshStreamDto): void {
        this.mLocalStreamDtos = refreshStreamDto.local;
        this.mExternalStreamDtos = refreshStreamDto.external;
    }
}

type RefreshStreamDto = {
    local: StreamDto[],
    external: StreamDto[],
};
