import { TestBed } from '@angular/core/testing';

import { AdminMiddlewareService } from './admin-middleware.service';

describe('AdminMiddlewareService', () => {
  let service: AdminMiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminMiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
