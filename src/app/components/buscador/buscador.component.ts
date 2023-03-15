import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  input : string = "";

  constructor (private router: Router, public buscadorService : BuscadorEmpleadosService) {

  }

  buscar() {
    this.buscadorService.getEmpleado(this.input);
  }

  irA(ruta:string) {
    this.router.navigate([ruta]);
  }
}
