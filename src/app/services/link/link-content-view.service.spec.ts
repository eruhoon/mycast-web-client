import { TestBed } from '@angular/core/testing';

import { LinkContentViewService } from './link-content-view.service';

describe('LinkContentViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LinkContentViewService = TestBed.get(LinkContentViewService);
    expect(service).toBeTruthy();
  });
});
