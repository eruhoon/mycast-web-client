export interface ChatNetworkModel {
    chat(chat: string): void;
    modifyProfile(name: string, icon: string): void;
}
