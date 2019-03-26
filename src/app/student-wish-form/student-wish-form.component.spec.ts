import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentWishFormComponent } from './student-wish-form.component';

describe('StudentWishFormComponent', () => {
  let component: StudentWishFormComponent;
  let fixture: ComponentFixture<StudentWishFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentWishFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentWishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
