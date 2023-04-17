import { TestBed } from '@angular/core/testing';

import { BuscadorEmpleadosService } from './buscador-empleados.service';

describe('BuscadorEmpleadosService', () => {
  let service: BuscadorEmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadorEmpleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
