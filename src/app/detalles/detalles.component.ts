import { Component, OnInit } from '@angular/core';
import { BuscadorEmpleadosService } from '../services/buscador-empleados.service';

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

       this.empleado = this.buscador.result[index];
    });
  }


}
