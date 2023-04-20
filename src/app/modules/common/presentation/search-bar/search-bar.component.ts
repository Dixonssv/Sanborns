import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { EmpleadoRepositoryService } from 'src/app/modules/inicio/data/repositories/empleado-repository.impl';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  public input : string = "";

  searchTextChanged = new Subject<string>();

  constructor(
    private router: Router, 
    private empleadoRepository: EmpleadoRepositoryService) {

  }

  ngOnInit() {
    this.searchTextChanged.pipe(debounceTime(1000), distinctUntilChanged())
    .subscribe((cadena) => {
      this.empleadoRepository.getEmpleados(cadena);
     });
  }

  search() {
    this.searchTextChanged.next(this.input);
    this.empleadoRepository.buscando = false;
  }

  goTo(ruta:string) {
    this.router.navigate([ruta]);
  }


}
