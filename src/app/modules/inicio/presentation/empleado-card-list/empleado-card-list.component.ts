import { Component } from '@angular/core';
import { EmpleadoModel } from             '../../core/domain/empleado.model';
import { GetEmpleadosUseCase } from       '../../core/usecases/get-empleados.usecase';
import { EmpleadoRepositoryService } from  '../../data/repositories/empleado-repository.impl';

@Component({
  selector: 'app-empleado-card-list',
  templateUrl: './empleado-card-list.component.html',
  styleUrls: ['./empleado-card-list.component.css']
})
export class EmpleadoCardListComponent {
  
  empleados: Array<EmpleadoModel>;

  constructor(
    public empleadosRepository: EmpleadoRepositoryService,
    private getEmpleados: GetEmpleadosUseCase
    ) {
    this.empleados = [];
  }

  searchEmpleados(search: string) {
    this.empleados = [];

    this.getEmpleados.execute(search).subscribe((empleado: EmpleadoModel) => {
      this.empleados.push(empleado);
    });

  }

}
