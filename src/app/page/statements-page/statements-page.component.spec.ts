import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementsPageComponent } from './statements-page.component';

describe('StatementsPageComponent', () => {
  let component: StatementsPageComponent;
  let fixture: ComponentFixture<StatementsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatementsPageComponent]
    });
    fixture = TestBed.createComponent(StatementsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
