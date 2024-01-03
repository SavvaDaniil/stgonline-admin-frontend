import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionEditPageComponent } from './subscription-edit-page.component';

describe('SubscriptionEditPageComponent', () => {
  let component: SubscriptionEditPageComponent;
  let fixture: ComponentFixture<SubscriptionEditPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscriptionEditPageComponent]
    });
    fixture = TestBed.createComponent(SubscriptionEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
