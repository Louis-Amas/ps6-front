import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterBarBriComponent } from './filter-bar-bri.component';

describe('FilterBarBriComponent', () => {
  let component: FilterBarBriComponent;
  let fixture: ComponentFixture<FilterBarBriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterBarBriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBarBriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
