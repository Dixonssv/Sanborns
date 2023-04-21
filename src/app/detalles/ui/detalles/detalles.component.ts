import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

//import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados/buscador-empleados.service';
import { DashboardComponentsService } from '../../services/dashboard-components/dashboard-components.service';
import { ExpedienteService } from 'src/app/services/expediente/expediente.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  empleado: any;

  constructor (
    //private buscador:BuscadorEmpleadosService, 
    private route: ActivatedRoute, 
    public dashboardService: DashboardComponentsService,
    public expediente: ExpedienteService) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(this.buscador.result);
      console.log(+params['index']);
      //console.log(this.buscador.result[+params['index']]);
      //this.expediente.setEmpleado(this.buscador.result[+params['index']]) ;
    });
  }
}
