import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkContentViewerComponent } from './link-content-viewer.component';

describe('LinkContentViewerComponent', () => {
  let component: LinkContentViewerComponent;
  let fixture: ComponentFixture<LinkContentViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkContentViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkContentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
