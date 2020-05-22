import { TestBed } from '@angular/core/testing';

import { RequestUserProjectService } from './request-user-project.service';

describe('RequestUserProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestUserProjectService = TestBed.get(RequestUserProjectService);
    expect(service).toBeTruthy();
  });
});
