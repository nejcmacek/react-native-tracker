import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSettingsComponent } from './change-settings.component';

describe('ChangeSettingsComponent', () => {
  let component: ChangeSettingsComponent;
  let fixture: ComponentFixture<ChangeSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
