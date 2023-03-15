import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscadorEmpleadosService {

  urlApi = 'https://administration.gsanborns.com.mx/api/empleados/buscar';

  result : any;

  constructor(private http : HttpClient) { }

  async getEmpleado(empleado : string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('santiago:2LchKVi2$EX*w*&8TlE64FpaSX0uCp4MqoEUC%yr0o*yf6FGEX')}`
      }),
      params: new HttpParams().set("query", empleado)
    }

    if(empleado != "") {
      this.http.get(this.urlApi, options).subscribe((data:any) => {
        this.result = data.body;
      });
    } else {
      this.result = [];
    }
    
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
  }

  getDetallesEmpleado(index:number) {
    return this.result[index];
  }
}
