import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePackComponent } from './image-pack.component';

describe('ImagePackComponent', () => {
  let component: ImagePackComponent;
  let fixture: ComponentFixture<ImagePackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
