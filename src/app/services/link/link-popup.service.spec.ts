import { TestBed } from '@angular/core/testing';

import { LinkPopupService } from './link-popup.service';

describe('YoutubePopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkPopupService = TestBed.get(LinkPopupService);
    expect(service).toBeTruthy();
  });
});
