import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SettingViewComponent } from './setting-view.component';

describe('SettingViewComponent', () => {
  let component: SettingViewComponent;
  let fixture: ComponentFixture<SettingViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SettingViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
