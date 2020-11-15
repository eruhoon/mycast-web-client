import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationPushListComponent } from './notification-push-list.component';

describe('NotificationPushListComponent', () => {
  let component: NotificationPushListComponent;
  let fixture: ComponentFixture<NotificationPushListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationPushListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPushListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
