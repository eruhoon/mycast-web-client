import { SocketModel } from './SocketModel';

export class WebSocketModel implements SocketModel {

    private static readonly URL = 'ws://mycast.xyz:8001';

    private mPrivKey: string;
    private mWebSocket: WebSocket;

    public constructor(privateKey: string) {
        this.mPrivKey = privateKey;
        this.mWebSocket = new WebSocket(WebSocketModel.URL);

        this.mWebSocket.onopen = () => this.onOpenSocket();
        this.mWebSocket.onmessage = message => this.onMessage(message);
        this.mWebSocket.onclose = () => this.onClose();
    }

    public login(): void {
        this.sendMessage('user-login', {
            channel: 'chat',
            privateKey: this.mPrivKey
        });
    }

    private onOpenSocket(): void {
        console.log('onOpenSocket');
        this.login();
    }

    private onMessage(message: MessageEvent): void {
        console.log('onMessage', message);
    }

    private onClose(): void {
        console.log('onClose');
    }

    private sendMessage(commandType: string, resource: any) {
        const sendMsg = { commandType, resource };
        console.log(sendMsg);
        this.mWebSocket.send(JSON.stringify(sendMsg));
    }
}
