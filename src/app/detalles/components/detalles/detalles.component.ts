import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css', '../../detalles.css']
})
export class DetallesComponent {
  empleado: any;

  constructor (private buscador:BuscadorEmpleadosService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(this.buscador.result);
      console.log(+params['index']);
      console.log(this.buscador.result[+params['index']]);
      this.empleado = this.buscador.result[+params['index']];
    });
  }
}
