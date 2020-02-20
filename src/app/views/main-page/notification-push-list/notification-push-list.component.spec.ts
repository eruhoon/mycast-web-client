import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPushListComponent } from './notification-push-list.component';

describe('NotificationPushListComponent', () => {
  let component: NotificationPushListComponent;
  let fixture: ComponentFixture<NotificationPushListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationPushListComponent ]
    })
    .compileComponents();
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
