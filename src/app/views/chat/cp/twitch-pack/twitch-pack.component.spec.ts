import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchPackComponent } from './twitch-pack.component';

describe('TwitchPackComponent', () => {
  let component: TwitchPackComponent;
  let fixture: ComponentFixture<TwitchPackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchPackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchPackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
