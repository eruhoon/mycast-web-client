import { ChatMessage } from 'src/app/models/chat/ChatMessage';

import { Input, Output } from '@angular/core';

export abstract class ChatPack {
    @Input() message: ChatMessage;
}
