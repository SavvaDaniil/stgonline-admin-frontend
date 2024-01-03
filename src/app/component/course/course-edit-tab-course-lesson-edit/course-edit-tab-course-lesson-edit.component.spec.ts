import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditTabCourseLessonEditComponent } from './course-edit-tab-course-lesson-edit.component';

describe('CourseEditTabCourseLessonEditComponent', () => {
  let component: CourseEditTabCourseLessonEditComponent;
  let fixture: ComponentFixture<CourseEditTabCourseLessonEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseEditTabCourseLessonEditComponent]
    });
    fixture = TestBed.createComponent(CourseEditTabCourseLessonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
