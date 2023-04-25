import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

//import { BuscadorEmpleadosService } from 'src/app/services/buscador-empleados/buscador-empleados.service';
import { ExpedienteService } from 'src/app/services/expediente/expediente.service';
import { SearchRepositoryImplService } from 'src/app/modules/common/data/repositories/search-repository.impl';
import { DashboardRepositoryImplService } from '../../data/repositories/dashboard-repository.impl';
import { getCardsCountUseCase } from '../../core/usecases/get-cards-count.usecase';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {

  showDownloadBtn: boolean;


  constructor ( 
    private route: ActivatedRoute, 
    public searchRepository: SearchRepositoryImplService,
    public getCardsCount: getCardsCountUseCase,
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

    this.getCardsCount.execute().subscribe((count) => {
      this.showDownloadBtn = count > 0;
    });
  }
}
