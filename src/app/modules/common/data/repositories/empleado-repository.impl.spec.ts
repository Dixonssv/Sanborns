import { TestBed } from '@angular/core/testing';

import { EmpleadoRepositoryService } from './empleado-repository.impl';

describe('BuscadorEmpleadosService', () => {
  let service: EmpleadoRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
