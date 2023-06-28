import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../../models/empleado.model';
import { WebStorageMethods, WebStorageService } from '../webStorage/web-storage.service';
import { Expediente } from '../../models/expediente.model';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService implements WebStorageMethods {

  private expediente!: Expediente;

  constructor(private webStorageService: WebStorageService) { }

  webStorageOnInit(): void {
    this.expediente = this.webStorageService.getData("expediente");
  }

  webStorageAfterInit(): void {
    this.webStorageService.storeData("expediente", this.expediente);
  }

  webStorageOnDestroy(): void {
    this.webStorageService.removeData("expediente");
  }

  setExpediente(empleado: EmpleadoModel) {
    this.expediente = {
      empleado: empleado
    }
  }

  getEmpleado(): EmpleadoModel {
    return this.expediente.empleado;
  }

  setEmpleado(empleado: EmpleadoModel) {
    this.expediente.empleado = empleado;
  }
  
}
