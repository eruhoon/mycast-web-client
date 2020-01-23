import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamPlayerPageComponent } from './stream-player-page.component';

describe('StreamPlayerPageComponent', () => {
  let component: StreamPlayerPageComponent;
  let fixture: ComponentFixture<StreamPlayerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamPlayerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamPlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
