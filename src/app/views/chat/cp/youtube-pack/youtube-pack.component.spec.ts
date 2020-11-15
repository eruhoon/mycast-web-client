import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { YoutubePackComponent } from './youtube-pack.component';

describe('YoutubePackComponent', () => {
  let component: YoutubePackComponent;
  let fixture: ComponentFixture<YoutubePackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [YoutubePackComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubePackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
