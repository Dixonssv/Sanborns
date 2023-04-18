import { Injectable } from '@angular/core';
import { EmpleadoRepository } from '../../core/repositories/empleado.repository';
import { Observable, map } from 'rxjs';
import { EmpleadoModel } from '../../core/domain/empleado.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmpleadoMapper } from './empleado.mapper';

@Injectable({
  providedIn: 'root'
})
export class BuscadorEmpleadosService extends EmpleadoRepository {

  urlApi = 'https://checkpoints.gsanborns.com.mx/api/empleados/buscar';

  result : any;

  buscando : boolean;

  private mapper: EmpleadoMapper;

  
  constructor(private http : HttpClient) { 
    super();

    this.buscando = false;
    this.result = [];
    this.mapper = new EmpleadoMapper();
  }

  override getAllEmpleados(): Observable<EmpleadoModel> {
    throw new Error('Method not implemented.');
  }

  override getEmpleados(query: string): Observable<EmpleadoModel> {
    if(query == "") {
      this.result = [];
      this.buscando = false;
    } else {
      this.buscarEnApi(query);
    }

    console.log("--> Llamada a la API -->");

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('santiago:2LchKVi2$EX*w*&8TlE64FpaSX0uCp4MqoEUC%yr0o*yf6FGEX')}`
      }),
      params: new HttpParams().set("query", query)
    }

    return this.http.get(this.urlApi, options).pipe(map(this.mapper.mapFrom));
  }

  buscarEnApi(query:string) {
    console.log("--> Llamada a la API -->");

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('santiago:2LchKVi2$EX*w*&8TlE64FpaSX0uCp4MqoEUC%yr0o*yf6FGEX')}`
      }),
      params: new HttpParams().set("query", query)
    }

    /*
    this.http.get(this.urlApi, options).subscribe((data:any) => {
      this.result = data.body;
      this.buscando = false;
    });
    */

  }


  
}
