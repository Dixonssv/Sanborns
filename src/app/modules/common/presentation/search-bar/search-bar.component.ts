import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { EmpleadoRepositoryService } from 'src/app/modules/inicio/data/repositories/empleado-repository.impl';
import { SearchRepository } from '../../core/repositories/search.repository';
import { SearchRepositoryImplService } from '../../data/repositories/search-repository.impl';

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
    private searchRepository: SearchRepositoryImplService,
    private empleadoRepository: EmpleadoRepositoryService) {

  }

  ngOnInit() {
    this.searchTextChanged.pipe(debounceTime(500), distinctUntilChanged())
    .subscribe((input) => {
      this.searchRepository.searchEmpleados(input).subscribe();
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
