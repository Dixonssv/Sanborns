import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscadorEmpleadosService {

  //urlJson = 'https://jsonplaceholder.typicode.com/posts';

  urlApi = 'https://administration.gsanborns.com.mx/api/empleados/buscar';

  result : any;

  constructor(private http : HttpClient) { }

  /*
  getJson(id : number) {
    let params = new HttpParams().append("userId", id);

    const req = this.http.get(this.urlJson, {params : params});
    
    req.subscribe(data => {this.result = data});
  }
  */

  getEmpleado(empleado : string) {
    let params = new HttpParams();

    params.append("query", empleado);

    this.http.get(this.urlApi, {params: params}).subscribe(data => {this.result = data});
  }
}
