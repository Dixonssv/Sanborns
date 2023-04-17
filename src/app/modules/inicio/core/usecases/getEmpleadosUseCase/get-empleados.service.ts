import { Injectable } from '@angular/core';
import { UseCase } from '../../base/use-case';
import { EmpleadoModel } from '../../domain/empleado.model';
import { Observable } from 'rxjs';
import { EmpleadoRepository } from '../../repositories/empleado.repository';

@Injectable({
  providedIn: 'root'
})
export class GetEmpleadosService implements UseCase<string, EmpleadoModel> {

  constructor(private empleadoRepository: EmpleadoRepository) { }

  execute(params: string): Observable<EmpleadoModel> {
    return this.empleadoRepository.getEmpleados(params);
  }
  
}
