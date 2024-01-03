import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditTabCourseDayEditComponent } from './course-edit-tab-course-day-edit.component';

describe('CourseEditTabCourseDayEditComponent', () => {
  let component: CourseEditTabCourseDayEditComponent;
  let fixture: ComponentFixture<CourseEditTabCourseDayEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseEditTabCourseDayEditComponent]
    });
    fixture = TestBed.createComponent(CourseEditTabCourseDayEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
