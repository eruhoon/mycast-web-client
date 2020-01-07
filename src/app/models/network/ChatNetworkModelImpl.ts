import { WebSocketModel } from '../socket/WebSocketModel';
import { ChatNetworkModel } from './ChatNetworkModel';

export class ChatNetworkModelImpl implements ChatNetworkModel {

    private mModel: WebSocketModel;

    public constructor(privateKey: string) {
        this.mModel = new WebSocketModel(privateKey);
    }
}
