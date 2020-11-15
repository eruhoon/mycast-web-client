import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChatUserEntryComponent } from './chat-user-entry.component';

describe('ChatUserEntryComponent', () => {
  let component: ChatUserEntryComponent;
  let fixture: ComponentFixture<ChatUserEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ChatUserEntryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
