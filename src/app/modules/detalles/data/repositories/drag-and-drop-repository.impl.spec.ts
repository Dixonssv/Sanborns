import { TestBed } from '@angular/core/testing';

import { DragAndDropRepositoryImplService } from './drag-and-drop-repository.impl';

describe('DragAndDropRepositoryImplService', () => {
  let service: DragAndDropRepositoryImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragAndDropRepositoryImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
