import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPackComponent } from './link-pack.component';

describe('LinkPackComponent', () => {
  let component: LinkPackComponent;
  let fixture: ComponentFixture<LinkPackComponent>;

  beforeEach(async(() => {
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
