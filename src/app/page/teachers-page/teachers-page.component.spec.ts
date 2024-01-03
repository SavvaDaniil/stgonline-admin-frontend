import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersPageComponent } from './teachers-page.component';

describe('TeachersPageComponent', () => {
  let component: TeachersPageComponent;
  let fixture: ComponentFixture<TeachersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeachersPageComponent]
    });
    fixture = TestBed.createComponent(TeachersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
