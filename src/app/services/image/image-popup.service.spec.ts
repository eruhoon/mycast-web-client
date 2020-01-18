import { TestBed } from '@angular/core/testing';

import { ImagePopupService } from './image-popup.service';

describe('ImagePopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagePopupService = TestBed.get(ImagePopupService);
    expect(service).toBeTruthy();
  });
});
