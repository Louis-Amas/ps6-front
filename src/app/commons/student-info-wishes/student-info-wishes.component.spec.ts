import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentInfoWishesComponent } from './student-info-wishes.component';

describe('StudentInfoWishesComponent', () => {
  let component: StudentInfoWishesComponent;
  let fixture: ComponentFixture<StudentInfoWishesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentInfoWishesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentInfoWishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
