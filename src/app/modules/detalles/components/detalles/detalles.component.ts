import { Component } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ExpedienteService } from 'src/app/modules/shared/services/expediente/expediente.service';
import { SearchService } from 'src/app/modules/shared/services/search/search.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {

  showDownloadBtn: boolean;

  constructor ( 
    private route: ActivatedRoute,
    private router: Router, 
    public searchService: SearchService,
    public expedienteService: ExpedienteService,
    public dashboardService: DashboardService) {

      this.showDownloadBtn = false;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //console.log(this.buscador.result);
      let index = +params['index'];

      if(Number.isNaN(index)) {
        this.router.navigate(['inicio']);
      } else {
        this.expedienteService.setEmpleado(this.searchService.empleados[index]);
      }

      //console.log(this.buscador.result[+params['index']]);
      //--> this.expediente.setEmpleado(this.searchRepository.empleados[+params['index']]) ;
    });

    this.dashboardService.getCardsCount().subscribe((count) => {
      this.showDownloadBtn = count > 0;
    });
  }
}
