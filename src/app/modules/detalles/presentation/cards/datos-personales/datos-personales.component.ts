import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ExpedienteService } from 'src/app/services/expediente/expediente.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css', '../cards.css']
})
export class DatosPersonalesComponent {
  empleado:any;

  constructor(
    private route: ActivatedRoute,
    public expediente: ExpedienteService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(this.buscador.result);
      //console.log(+params['id']);
      //console.log(this.buscador.result[+params['index']]);
      //this.empleado = this.buscador.result[+params['index']];
    });

    //this.empleado = this.expediente.getEmpleado();
  }
}
