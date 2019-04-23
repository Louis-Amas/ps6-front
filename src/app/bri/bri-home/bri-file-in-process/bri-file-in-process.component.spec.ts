import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriFileInProcessComponent } from './bri-file-in-process.component';

describe('BriFileInProcessComponent', () => {
  let component: BriFileInProcessComponent;
  let fixture: ComponentFixture<BriFileInProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriFileInProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriFileInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
