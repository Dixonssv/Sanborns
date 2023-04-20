import { Observable } from 'rxjs';
import { UseCase } from '../base/use-case';
import { EmpleadoModel } from '../domain/empleado.model';
import { EmpleadoRepository } from '../repositories/empleado.repository';
import { Injectable } from '@angular/core';
import { EmpleadoRepositoryService } from '../../data/repositories/empleado-repository.impl';

@Injectable({
  providedIn: 'root'
})
export class GetEmpleadosUseCase implements UseCase<string, EmpleadoModel> {

  constructor(private empleadoRepository: EmpleadoRepositoryService) { }

  execute(params: string): Observable<EmpleadoModel> {
    //console.log(this.empleadoRepository.buscando);

    return this.empleadoRepository.getEmpleados(params);
  }
  
}