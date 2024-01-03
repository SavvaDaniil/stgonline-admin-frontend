import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEditPageComponent } from './teacher-edit-page.component';

describe('TeacherEditPageComponent', () => {
  let component: TeacherEditPageComponent;
  let fixture: ComponentFixture<TeacherEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherEditPageComponent]
    });
    fixture = TestBed.createComponent(TeacherEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
