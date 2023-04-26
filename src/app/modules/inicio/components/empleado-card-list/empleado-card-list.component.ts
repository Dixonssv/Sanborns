import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmpleadoModel } from 'src/app/modules/shared/models/empleado.model';
import { SearchService } from 'src/app/modules/shared/services/search.service';
import { EmpleadoService } from 'src/app/modules/shared/services/empleado.service';

@Component({
  selector: 'app-empleado-card-list',
  templateUrl: './empleado-card-list.component.html',
  styleUrls: ['./empleado-card-list.component.css'],
  encapsulation: ViewEncapsulation.None, // Aplicar estilos a innerHTML
})
export class EmpleadoCardListComponent implements OnInit{
  
  empleados: Array<EmpleadoModel>;
  public searching : boolean;

  constructor(
    public searchService:SearchService,
    public empleadosService:EmpleadoService,
    ) {
      this.searching = false;

      this.empleados = [];
  }

  ngOnInit(): void {
    this.searchService.searchStarted.subscribe(() => {
      // Searching...
      console.log("Buscando...");
      this.searching = true;
    });

    this.searchService.searchCompleted.subscribe(() => {
      // SearchCompleted
      console.log("Busqueda terminada!...");
      this.searching = false;
      this.empleados = this.searchService.empleados;
    });
  }

}
