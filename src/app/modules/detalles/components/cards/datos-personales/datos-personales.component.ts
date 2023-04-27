import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ExpedienteService } from 'src/app/modules/shared/services/expediente/expediente.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css', '../cards.css']
})
export class DatosPersonalesComponent {
  empleado:any;

  constructor(
    public expedienteService: ExpedienteService) {
  }

  ngOnInit() {
    this.empleado = this.expedienteService.getEmpleado();
  }
}
