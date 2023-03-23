import { TestBed } from '@angular/core/testing';

import { DashboardComponentsService } from './dashboard-components.service';

describe('DashboardComponentsService', () => {
  let service: DashboardComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
