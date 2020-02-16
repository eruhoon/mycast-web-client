export interface User {
    getHash(): string;
    getName(): string;
    getIcon(): string;
    getLevel(): number;
    isComputer(): boolean;
    isMobile(): boolean;
}
