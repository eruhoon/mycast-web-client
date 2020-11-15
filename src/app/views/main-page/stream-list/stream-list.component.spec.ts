import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StreamListComponent } from './stream-list.component';

describe('StreamListComponent', () => {
  let component: StreamListComponent;
  let fixture: ComponentFixture<StreamListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StreamListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
