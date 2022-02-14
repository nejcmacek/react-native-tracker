import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterinfoComponent } from './filterinfo.component';

describe('FilterinfoComponent', () => {
  let component: FilterinfoComponent;
  let fixture: ComponentFixture<FilterinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
