import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { SearchService } from '../../services/search/search.service';

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
    private searchService: SearchService) {

  }

  ngOnInit() {
    this.searchTextChanged.pipe(debounceTime(500), distinctUntilChanged()).subscribe((input) => {
      this.router.navigate(["inicio"]).then(() => {
        console.log("Se navego a inicio!");
        this.searchService.searchEmpleados(input).subscribe();
      });
    });
  }

  search() {
    this.searchTextChanged.next(this.input);
    //this.searchService.searchStarted.next(true);
  }

  goTo(ruta:string) {
    this.router.navigate([ruta]);
  }


}
