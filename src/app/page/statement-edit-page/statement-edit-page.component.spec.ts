import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementEditPageComponent } from './statement-edit-page.component';

describe('StatementEditPageComponent', () => {
  let component: StatementEditPageComponent;
  let fixture: ComponentFixture<StatementEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatementEditPageComponent]
    });
    fixture = TestBed.createComponent(StatementEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
