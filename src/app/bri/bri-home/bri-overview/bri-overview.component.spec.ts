import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriOverviewComponent } from './bri-overview.component';

describe('BriOverviewComponent', () => {
  let component: BriOverviewComponent;
  let fixture: ComponentFixture<BriOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
