import { BaseToast } from './BaseToast';

export class DefaultToast extends BaseToast {

    private mText: string;

    public constructor(text: string) {
        super();
        this.mText = text;
    }

    public getText(): string {
        return this.mText;
    }
}
