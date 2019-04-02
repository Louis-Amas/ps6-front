import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWishListComponent } from './student-wish-list.component';

describe('StudentWishListComponent', () => {
  let component: StudentWishListComponent;
  let fixture: ComponentFixture<StudentWishListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentWishListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
