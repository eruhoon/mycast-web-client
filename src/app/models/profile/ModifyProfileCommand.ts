import { ChatNetworkModel } from '../network/ChatNetworkModel';

export class ModifyProfileCommand {
  private mChatNetwork: ChatNetworkModel;

  public constructor(chatNetwork: ChatNetworkModel) {
    this.mChatNetwork = chatNetwork;
  }

  public execute(req: ModifyProfileRequest): void {
    this.mChatNetwork.modifyProfile(req.name, req.icon);
  }
}

export type ModifyProfileRequest = {
  name: string;
  icon: string;
  statusMessage: string;
};

export type ModifyProfileResponse = {
  name: string;
  icon: string;
  statusMessage: string;
};
