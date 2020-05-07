import { TestBed } from '@angular/core/testing';

import { RequestProfileService } from './request-profile.service';

describe('RequestProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestProfileService = TestBed.get(RequestProfileService);
    expect(service).toBeTruthy();
  });
});
