import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditPageComponent } from './course-edit-page.component';

describe('CourseEditPageComponent', () => {
  let component: CourseEditPageComponent;
  let fixture: ComponentFixture<CourseEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseEditPageComponent]
    });
    fixture = TestBed.createComponent(CourseEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
