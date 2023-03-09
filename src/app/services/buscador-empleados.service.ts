import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuscadorEmpleadosService {

  urlApi = 'https://administration.gsanborns.com.mx/api/empleados/buscar';

  result : any;

  constructor(private http : HttpClient) { }

  getEmpleado(empleado : string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('santiago:2LchKVi2$EX*w*&8TlE64FpaSX0uCp4MqoEUC%yr0o*yf6FGEX')}`
      }),
      params: new HttpParams().set("query", empleado)
    }

    this.http.get(this.urlApi, options).subscribe((data:any) => {
      this.result = data.body;
    });
  }
}
