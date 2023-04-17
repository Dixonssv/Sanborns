import { TestBed } from '@angular/core/testing';

import { GetEmpleadosService } from './get-empleados.service';

describe('GetEmpleadosService', () => {
  let service: GetEmpleadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEmpleadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
