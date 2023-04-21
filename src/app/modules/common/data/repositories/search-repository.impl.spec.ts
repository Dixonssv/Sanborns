import { TestBed } from '@angular/core/testing';

import { SearchRepositoryImplService } from './search-repository.impl';

describe('SearchRepositoryImplService', () => {
  let service: SearchRepositoryImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchRepositoryImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
