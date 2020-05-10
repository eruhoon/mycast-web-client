import * as io from 'socket.io-client';
import { TypeCallback } from '../../common/callback/TypeCallback';
import { SessionStorage } from '../../storage/SessionStorage';
import { StreamDto } from '../StreamDto';

export class StreamSocketModel {

    private static readonly SOCKET_HOST: string = 'https://mycast.xyz:9000';

    private mSocket: SocketIOClient.Socket;
    private mLocalStreamDtos: StreamDto[];
    private mExtStreamDtos: StreamDto[];
    private mOnLocalStreamChanged: TypeCallback<StreamDto[]>;
    private mOnExtStreamChanged: TypeCallback<StreamDto[]>;

    public constructor() {
        this.mSocket = StreamSocketModel.createSocket();
        this.mSocket.on('connect', () => { console.log('connected'); });
        this.mSocket.on('refresh_streams', (raw: RefreshStreamDto) => {
            this.onRefreshStreams(raw);
        });

        this.mLocalStreamDtos = [];
        this.mExtStreamDtos = [];
        this.mOnLocalStreamChanged = _ => { };
        this.mOnExtStreamChanged = _ => { };
    }

    private static createSocket(): SocketIOClient.Socket {
        const privateKey = SessionStorage.getInstance().getPrivateKey();
        const option = { query: `key=${privateKey}` };

        return io.connect(this.SOCKET_HOST, option);
    }

    public setOnLocalStreamChanged(callback: TypeCallback<StreamDto[]>): void {
        this.mOnLocalStreamChanged = callback;
    }

    public setOnExtStreamChanged(callback: TypeCallback<StreamDto[]>): void {
        this.mOnExtStreamChanged = callback;
    }

    public getLocalStreamDtos(): StreamDto[] {
        return this.mLocalStreamDtos;
    }

    public getExtStreamDtos(): StreamDto[] {
        return this.mExtStreamDtos;
    }

    private onRefreshStreams(refreshStreamDto: RefreshStreamDto): void {
        this.mLocalStreamDtos = refreshStreamDto.local;
        this.mExtStreamDtos = refreshStreamDto.external;

        this.mOnLocalStreamChanged(this.mLocalStreamDtos);
        this.mOnExtStreamChanged(this.mExtStreamDtos);
    }
}

type RefreshStreamDto = {
    local: StreamDto[],
    external: StreamDto[],
};
