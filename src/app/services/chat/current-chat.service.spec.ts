import { TestBed } from '@angular/core/testing';

import { CurrentChatService } from './current-chat.service';

describe('CurrentChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentChatService = TestBed.get(CurrentChatService);
    expect(service).toBeTruthy();
  });
});
