import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

//import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados/buscador-empleados.service';
import { ExpedienteService } from 'src/app/services/expediente/expediente.service';
import { SearchService } from 'src/app/modules/shared/services/search.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {

  showDownloadBtn: boolean;

  constructor ( 
    private route: ActivatedRoute, 
    public searchService: SearchService,
    public dashboardService: DashboardService,
    public expediente: ExpedienteService) {

      this.showDownloadBtn = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(this.buscador.result);
      console.log(+params['index']);
      //console.log(this.buscador.result[+params['index']]);
      //--> this.expediente.setEmpleado(this.searchRepository.empleados[+params['index']]) ;
    });

    this.dashboardService.getCardsCount().subscribe((count) => {
      this.showDownloadBtn = count > 0;
    });
  }
}
