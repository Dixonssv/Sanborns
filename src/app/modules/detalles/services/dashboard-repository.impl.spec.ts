import { TestBed } from '@angular/core/testing';

import { DashboardRepositoryImplService } from './dashboard-repository.impl';

describe('DashboardRepositoryImplService', () => {
  let service: DashboardRepositoryImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardRepositoryImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
