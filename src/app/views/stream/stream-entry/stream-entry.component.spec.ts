import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamEntryComponent } from './stream-entry.component';

describe('StreamEntryComponent', () => {
  let component: StreamEntryComponent;
  let fixture: ComponentFixture<StreamEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
