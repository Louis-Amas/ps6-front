import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWishOverviewDialogComponent } from './update-wish-overview-dialog.component';

describe('UpdateWishOverviewDialogComponent', () => {
  let component: UpdateWishOverviewDialogComponent;
  let fixture: ComponentFixture<UpdateWishOverviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWishOverviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWishOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
