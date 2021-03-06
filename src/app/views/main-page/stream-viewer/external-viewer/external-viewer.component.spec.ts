import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExternalViewerComponent } from './external-viewer.component';

describe('ExternalViewerComponent', () => {
  let component: ExternalViewerComponent;
  let fixture: ComponentFixture<ExternalViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
