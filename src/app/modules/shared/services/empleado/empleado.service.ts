import { Injectable } from '@angular/core';
import { EmpleadoMapper } from '../../models/mappers/empleado.mapper';
import { ApiResponseMapper } from '../../models/mappers/api-response.mapper';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EmpleadoModel } from '../../models/empleado.model';
import { Observable, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  urlApi = 'https://checkpoints.gsanborns.com.mx/api/empleados/buscar';

  private empleadoMapper: EmpleadoMapper;
  private apiResponseMapper: ApiResponseMapper;
  
  constructor(private http : HttpClient) { 
    this.empleadoMapper = new EmpleadoMapper();
    this.apiResponseMapper = new ApiResponseMapper();
  }

  getAllEmpleados(): Observable<EmpleadoModel> {
    throw new Error('Method not implemented.');
  }

  getEmpleados(query: string): Observable<EmpleadoModel> {
    console.log("--> Llamada a la API -->");

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa('santiago:2LchKVi2$EX*w*&8TlE64FpaSX0uCp4MqoEUC%yr0o*yf6FGEX')}`
      }),
      params: new HttpParams().set("query", query)
    }

    return this.http.get(this.urlApi, options)
    .pipe(map(this.apiResponseMapper.mapFrom))
    .pipe(mergeMap((items) => items))
    .pipe(map(this.empleadoMapper.mapFrom));

  }
}
