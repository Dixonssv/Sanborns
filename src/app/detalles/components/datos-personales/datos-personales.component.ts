import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent {
  empleado:any;

  constructor(private buscador:BuscadorEmpleadosService, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(this.buscador.result);
      //console.log(+params['id']);
      //console.log(this.buscador.result[+params['index']]);
      //this.empleado = this.buscador.result[+params['index']];
    });
  }
}
