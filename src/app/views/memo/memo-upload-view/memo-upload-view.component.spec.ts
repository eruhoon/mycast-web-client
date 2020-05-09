import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoUploadViewComponent } from './memo-upload-view.component';

describe('MemoUploadViewComponent', () => {
  let component: MemoUploadViewComponent;
  let fixture: ComponentFixture<MemoUploadViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemoUploadViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoUploadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
