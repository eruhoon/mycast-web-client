import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TextPackComponent } from './text-pack.component';

describe('TextPackComponent', () => {
  let component: TextPackComponent;
  let fixture: ComponentFixture<TextPackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextPackComponent],
    }).compileComponents();
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
