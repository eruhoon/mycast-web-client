import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamViewerComponent } from './stream-viewer.component';

describe('StreamViewerComponent', () => {
  let component: StreamViewerComponent;
  let fixture: ComponentFixture<StreamViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StreamViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
