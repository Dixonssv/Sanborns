import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { EmpleadoModel } from '../domain/empleado.model';
import { EmpleadoRepository } from '../repositories/empleado.repository';
import { Injectable } from '@angular/core';
import { BuscadorEmpleadosService } from '../../data/repositories/buscador-empleados.service';

@Injectable({
  providedIn: 'root'
})
export class GetEmpleadosUseCase implements UseCase<string, EmpleadoModel> {

  constructor(private empleadoRepository: BuscadorEmpleadosService) { }

  execute(params: string): Observable<EmpleadoModel> {
    //console.log(this.empleadoRepository.buscando);

    return this.empleadoRepository.getEmpleados(params);
  }
  
}