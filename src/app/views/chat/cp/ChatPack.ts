import { ChatMessage } from 'src/app/models/chat/ChatMessage';
import { OptionService } from 'src/app/services/option/option.service';

import { Injector, Input, Optional, Directive } from '@angular/core';

@Directive()
export abstract class ChatPack {
    @Input() message: ChatMessage;

    private mOptionService: OptionService;

    public constructor(injector: Injector) {

        this.mOptionService = injector.get(OptionService);

    }

    public isMobile(): boolean {
        return this.mOptionService.isMobile();
    }

    public isDataSaveMode(): boolean {
        return this.mOptionService.isDataSaveMode();
    }
}
