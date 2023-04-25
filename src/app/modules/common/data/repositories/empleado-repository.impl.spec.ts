import { TestBed } from '@angular/core/testing';

import { EmpleadoRepositoryImplService } from './empleado-repository.impl';

describe('BuscadorEmpleadosService', () => {
  let service: EmpleadoRepositoryImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleadoRepositoryImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
