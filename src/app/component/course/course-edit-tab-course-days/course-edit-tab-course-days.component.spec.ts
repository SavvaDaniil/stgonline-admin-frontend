import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditTabCourseDaysComponent } from './course-edit-tab-course-days.component';

describe('CourseEditTabCourseDaysComponent', () => {
  let component: CourseEditTabCourseDaysComponent;
  let fixture: ComponentFixture<CourseEditTabCourseDaysComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseEditTabCourseDaysComponent]
    });
    fixture = TestBed.createComponent(CourseEditTabCourseDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
