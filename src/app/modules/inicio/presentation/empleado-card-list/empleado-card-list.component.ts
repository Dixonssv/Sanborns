import { Component } from '@angular/core';
import { EmpleadoModel } from             '../../core/domain/empleado.model';
import { GetEmpleadosUseCase } from       '../../core/usecases/get-empleados.usecase';
import { BuscadorEmpleadosService } from  '../../data/repositories/buscador-empleados.service';

@Component({
  selector: 'app-empleado-card-list',
  templateUrl: './empleado-card-list.component.html',
  styleUrls: ['./empleado-card-list.component.css']
})
export class EmpleadoCardListComponent {
  
  empleados: Array<EmpleadoModel>;

  constructor(
    public buscadorEmpleados: BuscadorEmpleadosService,
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
