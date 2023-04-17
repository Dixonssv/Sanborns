import { Component, ViewEncapsulation } from '@angular/core';
import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados/buscador-empleados.service';

@Component({
  selector: 'app-listado-empleados',
  templateUrl: './listado-empleados.component.html',
  styleUrls: ['./listado-empleados.component.css'],
  encapsulation: ViewEncapsulation.None, // Aplicar estilos a innerHTML
})
export class ListadoEmpleadosComponent {

  empleados: any;

  constructor(public buscadorService : BuscadorEmpleadosService) {

  }

}
