import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmpleadoModel } from 'src/app/modules/shared/models/empleado.model';
import { SearchService } from 'src/app/modules/shared/services/search/search.service';
import { EmpleadoService } from 'src/app/modules/shared/services/empleado/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado-card-list',
  templateUrl: './empleado-card-list.component.html',
  styleUrls: ['./empleado-card-list.component.css'],
  encapsulation: ViewEncapsulation.None, // Aplicar estilos a innerHTML
})
export class EmpleadoCardListComponent implements AfterViewInit, OnInit{
  
  public empleados: Array<EmpleadoModel> = [];
  public searching : boolean;

  constructor(
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    public searchService:SearchService,
    public empleadoService:EmpleadoService,
    ) {
      this.searching = false;

      //this.empleados = [];
  }

  ngOnInit(): void {

    this.empleados = [];

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

  ngAfterViewInit(): void {
    this.empleados = this.searchService.empleados;
  }

  viewDetails(index: number) {
    this.router.navigate(["detalles/" + index]);
  }

}
