import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmojiAttachViewComponent } from './emoji-attach-view.component';

describe('EmojiAttachViewComponent', () => {
  let component: EmojiAttachViewComponent;
  let fixture: ComponentFixture<EmojiAttachViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmojiAttachViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiAttachViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
