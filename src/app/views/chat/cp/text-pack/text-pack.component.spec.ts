import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextPackComponent } from './text-pack.component';

describe('TextPackComponent', () => {
  let component: TextPackComponent;
  let fixture: ComponentFixture<TextPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
