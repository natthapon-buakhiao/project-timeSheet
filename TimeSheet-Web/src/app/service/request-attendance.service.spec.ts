import { TestBed } from '@angular/core/testing';

import { RequestAttendanceService } from './request-attendance.service';

describe('RequestAttendanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestAttendanceService = TestBed.get(RequestAttendanceService);
    expect(service).toBeTruthy();
  });
});
