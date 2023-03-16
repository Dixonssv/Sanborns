import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NumberFormatStyle } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BuscadorEmpleadosService {

  urlApi = 'https://administration.gsanborns.com.mx/api/empleados/buscar';

  result : any = [];
  
  constructor(private http : HttpClient) { }

  getEmpleado(cadena : string) {
    if(cadena == "") {
      this.result = []
    } else if(!this.buscarEnSet(cadena)) {
      this.buscarEnApi(cadena);
    }
  }

  buscarEnApi(cadena:string) {
    console.log("--> Llamada a la API -->");

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('santiago:2LchKVi2$EX*w*&8TlE64FpaSX0uCp4MqoEUC%yr0o*yf6FGEX')}`
      }),
      params: new HttpParams().set("query", cadena)
    }
    
    this.http.get(this.urlApi, options).subscribe((data:any) => {
      this.result = data.body;
    });
  }

  buscarEnSet(cadena:string) {
    cadena = cadena.toUpperCase();

    let newResultSet:any = [];

    // Busca coincidencias en el set actual
    this.result.forEach((empleado:any, index:number) => {
      if(empleado.nombre.includes(cadena)) {
        empleado._formatted.nombre = this.reformat(empleado, cadena);
        newResultSet.push(empleado);
      } else {
        console.log("Se elimina " + empleado.nombre);
      }

      this.result = newResultSet;
    });

    if(this.result.length == 0) {
      return false;
    }

    return true;
  }

  reformat(empleado:any, cadena:string):string {
    let nombre = empleado.nombre;
    return nombre.replace(cadena, "<em>" + cadena + "</em>");
  }

  getDetallesEmpleado(index:number) {
    return this.result[index];
  }
}



// -----------------------------------------------------------------------
/*
    {
      "claveCompania": 1,
      "compania": "SANBORN HERMANOS",
      "claveArea": 5,
      "area": "OPERATIVOS",
      "claveUnidad": 17,
      "unidad": "ALMACEN DE DISTRIBUCION",
      "claveDepartamento": 152,
      "departamento": "CARPINTERIA",
      "clavePuesto": 370,
      "puesto": "CARPINTERO",
      "numeroEmpleado": "5771822",
      "nombre": "FIGUEROA PIÑA ALDAIR ALEXIS",
      "_formatted": {
        "claveCompania": 1,
        "compania": "SANBORN HERMANOS",
        "claveArea": 5,
        "area": "OPERATIVOS",
        "claveUnidad": 17,
        "unidad": "ALMACEN DE DISTRIBUCION",
        "claveDepartamento": 152,
        "departamento": "CARPINTERIA",
        "clavePuesto": 370,
        "puesto": "CARPINTERO",
        "numeroEmpleado": "5771822",
        "nombre": "FIGUEROA PIÑA <em>ALDAIR</em> ALEXIS",
        "_formatted": null
      }
    }
    */
