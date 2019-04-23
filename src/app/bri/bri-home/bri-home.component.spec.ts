import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriHomeComponent } from './bri-home.component';

describe('BriHomeComponent', () => {
  let component: BriHomeComponent;
  let fixture: ComponentFixture<BriHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
