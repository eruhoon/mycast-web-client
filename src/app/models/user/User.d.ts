export interface User {
    getHash(): string;
    getName(): string;
    getLevel(): number;
    isComputer(): boolean;
    isMobile(): boolean;
}
