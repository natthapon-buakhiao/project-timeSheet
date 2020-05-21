import { TestBed } from '@angular/core/testing';

import { RequestProjectService } from './request-project.service';

describe('RequestProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestProjectService = TestBed.get(RequestProjectService);
    expect(service).toBeTruthy();
  });
});
