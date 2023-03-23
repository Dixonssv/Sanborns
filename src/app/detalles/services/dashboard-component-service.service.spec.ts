import { TestBed } from '@angular/core/testing';

import { DashboardComponentServiceService } from './dashboard-component-service.service';

describe('AddComponentServiceService', () => {
  let service: DashboardComponentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardComponentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
