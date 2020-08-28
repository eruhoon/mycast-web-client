import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalViewerComponent } from './local-viewer.component';

describe('LocalViewerComponent', () => {
  let component: LocalViewerComponent;
  let fixture: ComponentFixture<LocalViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocalViewerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
