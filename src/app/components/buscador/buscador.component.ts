import { Component } from '@angular/core';

import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  input : string = "";

  constructor (public buscadorService : BuscadorEmpleadosService) {

  }
}
