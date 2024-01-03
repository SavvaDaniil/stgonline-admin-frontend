import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonEditPageComponent } from './lesson-edit-page.component';

describe('LessonEditPageComponent', () => {
  let component: LessonEditPageComponent;
  let fixture: ComponentFixture<LessonEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LessonEditPageComponent]
    });
    fixture = TestBed.createComponent(LessonEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
