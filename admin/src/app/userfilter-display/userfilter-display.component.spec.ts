import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserfilterDisplayComponent } from './userfilter-display.component';

describe('UserfilterDisplayComponent', () => {
  let component: UserfilterDisplayComponent;
  let fixture: ComponentFixture<UserfilterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserfilterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserfilterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
