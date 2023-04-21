import { Injectable } from '@angular/core';
import { SearchRepository } from '../../core/repositories/search.repository';
import { Observable, Subject, timer } from 'rxjs';
import { EmpleadoRepositoryImplService } from './empleado-repository.impl';
import { GetEmpleadosUseCase } from '../../core/usecases/get-empleados.usecase';
import { EmpleadoModel } from '../../core/domain/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class SearchRepositoryImplService extends SearchRepository{

  searchStarted = new Subject<boolean>();
  searchCompleted = new Subject<boolean>();

  empleados:EmpleadoModel[] = [];

  constructor(
    public empleadosRepository: EmpleadoRepositoryImplService,
    private getEmpleados: GetEmpleadosUseCase) { 
    super();
  }

  override searchEmpleados(input: string): Observable<void> {
    this.searchStarted.next(true);
    this.empleados = [];

    return new Observable<void>(observable => {
      //console.log("Esperando...");

      //setTimeout(() => {
        if(input != "") {
          this.getEmpleados.execute(input).subscribe((empleado: EmpleadoModel) => {
            this.empleados.push(empleado);
          });
        }
  
        this.searchCompleted.next(true);
      //}, 5000);
    })


  }

}
