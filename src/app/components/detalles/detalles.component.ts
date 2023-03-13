import { Component, OnInit } from '@angular/core';
import { BuscadorEmpleadosService } from '../../services/buscador-empleados.service';

import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit{

  empleado:any;

  constructor(  private route: ActivatedRoute, private buscador:BuscadorEmpleadosService) {

  }

  ngOnInit() {
    let index:number;

    this.route.params.subscribe(params => {
       index = +params['index']; // (+) converts string 'index' to a number

       if(this.buscador.result != undefined) {
        this.empleado = this.buscador.result[index];

        // Se almacena para el caso de refresh de la pagina
        localStorage.setItem('empleadoDetalles', JSON.stringify(this.empleado));
       } else {
        this.empleado = JSON.parse(localStorage.getItem('empleadoDetalles') as string);
       }
       
    });
  }


}
