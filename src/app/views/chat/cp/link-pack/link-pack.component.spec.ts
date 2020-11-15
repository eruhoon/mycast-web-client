import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LinkPackComponent } from './link-pack.component';

describe('LinkPackComponent', () => {
  let component: LinkPackComponent;
  let fixture: ComponentFixture<LinkPackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LinkPackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
