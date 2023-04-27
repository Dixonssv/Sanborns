import { Injectable, OnInit } from '@angular/core';
import { EmpleadoModel } from '../../models/empleado.model';
import { Observable, Subject } from 'rxjs';
import { EmpleadoService } from '../empleado/empleado.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService{

  searchStarted = new Subject<boolean>();
  searchCompleted = new Subject<boolean>();

  empleados:EmpleadoModel[] = [];

  constructor(public empleadoService: EmpleadoService) { 

  }

  searchEmpleados(input: string): Observable<void> {
    this.searchStarted.next(true);
    this.empleados = [];

    return new Observable<void>(observable => {
      console.log("Buscando a... " + input);

      //setTimeout(() => {
        if(input != "") {
          this.empleadoService.getEmpleados(input).subscribe((empleado: EmpleadoModel) => {
            this.empleados.push(empleado);
          });
        }
  
        this.searchCompleted.next(true);
      //}, 5000);
    })
  }
}
