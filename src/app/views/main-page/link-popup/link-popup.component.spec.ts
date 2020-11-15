import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LinkPopupComponent } from './link-popup.component';

describe('LinkPopupComponent', () => {
  let component: LinkPopupComponent;
  let fixture: ComponentFixture<LinkPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LinkPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
