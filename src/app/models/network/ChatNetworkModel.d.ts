export interface ChatNetworkModel {
    isOpen(): boolean;
    chat(chat: string): void;
    notify(to: string): void;
    modifyProfile(name: string, icon: string): void;
}
