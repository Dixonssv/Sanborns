import { Component } from '@angular/core';
import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados.service';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.css']
})
export class ListadoEmpleadosComponent {

  constructor(public buscadorService : BuscadorEmpleadosService) {

  }

}
