import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishOverviewDialogComponent } from './wish-overview-dialog.component';

describe('WishOverviewDialogComponent', () => {
  let component: WishOverviewDialogComponent;
  let fixture: ComponentFixture<WishOverviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishOverviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
