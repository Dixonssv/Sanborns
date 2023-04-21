import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmpleadoModel } from             '../../core/domain/empleado.model';
import { SearchRepositoryImplService } from 'src/app/modules/common/data/repositories/search-repository.impl';
import { EmpleadoRepositoryImplService } from 'src/app/modules/common/data/repositories/empleado-repository.impl';

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
    public searchRepository:SearchRepositoryImplService,
    public empleadosRepository:EmpleadoRepositoryImplService,
    ) {
      this.searching = false;

      this.empleados = [];
  }

  ngOnInit(): void {
    this.searchRepository.searchStarted.subscribe(() => {
      // Searching...
      console.log("Buscando...");
      this.searching = true;
    });

    this.searchRepository.searchCompleted.subscribe(() => {
      // SearchCompleted
      console.log("Busqueda terminada!...");
      this.searching = false;
      this.empleados = this.searchRepository.empleados;
    });
  }

}
