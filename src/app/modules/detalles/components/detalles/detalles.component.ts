import { Component, OnDestroy, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { ExpedienteService } from 'src/app/modules/shared/services/expediente/expediente.service';
import { SearchService } from 'src/app/modules/shared/services/search/search.service';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit, OnDestroy{

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

    this.route.params.subscribe(
      (params) => {
        try {
          // Obtener la informacion del buscador
          let index = +params['index'];
          let empleado = this.searchService.empleados[index];

          if(empleado === undefined) {
            throw new Error("Empleado no definido en la búsqueda");
          } else {
            this.expedienteService.setExpediente(empleado);
            // ... */
  
            this.expedienteService.webStorageAfterInit();
          }
        } catch (error: any) {
          this.expedienteService.webStorageOnInit();

          try {
            // Obtener la informacion del expediente
            if(this.expedienteService.getEmpleado() === null) {
              throw new Error("Empleado no definido en el expediente");
            }
            
          } catch (error: any) {
            console.log("Error: " + error.message);
            this.router.navigate(['inicio']);
          } 
        }
    });

    /* SUBSCRIPCIONES */
    this.dashboardService.cardsChanged.pipe().subscribe(() => {
      this.dashboardService.getCardsCount().subscribe((count) => {
        this.showDownloadBtn = count > 0;
      });
    });
  }

  ngOnDestroy(): void {
    this.expedienteService.webStorageOnDestroy();
  }
}
