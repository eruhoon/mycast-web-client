import { Directive, Injector, Input } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat/ChatMessage';
import { OptionService } from 'src/app/services/option/option.service';

@Directive()
export abstract class ChatPackDirective {
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
