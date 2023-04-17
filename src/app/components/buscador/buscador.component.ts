import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, filter } from "rxjs/operators";

import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados/buscador-empleados.service';



@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {

  input : string = "";

  searchTextChanged = new Subject<string>();

  constructor (private router: Router, public buscadorService : BuscadorEmpleadosService) {

  }
  
  // Espera 1000 ms antes de llamar a la API
  ngOnInit() {
    this.searchTextChanged.pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe((cadena) => {
      this.buscadorService.getEmpleado(cadena);
     });
  }

  buscar() {
    this.searchTextChanged.next(this.input);
    this.buscadorService.buscando = false;
  }

  irA(ruta:string) {
    this.router.navigate([ruta]);
  }
}
