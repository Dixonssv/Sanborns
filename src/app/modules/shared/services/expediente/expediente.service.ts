import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../../models/empleado.model';
import { WebStorageMethods, WebStorageService } from '../webStorage/web-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService implements WebStorageMethods {

  private empleado!:   EmpleadoModel;

  private actas:      any;
  private contrato:   any;
  private curriculum: any;
  private cursos:     any;
  private documentos: any;
  private estudios:   any;
  private horario:    any;
  private nomina:     any;
  private trayectoria:any;

  constructor(private webStorageService: WebStorageService) { }

  webStorageOnInit(): void {
    this.empleado     = this.webStorageService.getData("empleado");
    this.actas        = this.webStorageService.getData("actas");
    this.contrato     = this.webStorageService.getData("contrato");
    this.curriculum   = this.webStorageService.getData("curriculum");
    this.cursos       = this.webStorageService.getData("cursos");
    this.documentos   = this.webStorageService.getData("documentos");
    this.estudios     = this.webStorageService.getData("estudios");
    this.horario      = this.webStorageService.getData("horario");
    this.nomina       = this.webStorageService.getData("nomina");
    this.trayectoria  = this.webStorageService.getData("trayectoria");
  }

  webStorageAfterInit(): void {
    this.webStorageService.storeData("empleado", this.empleado);
    this.webStorageService.storeData("actas", this.actas);
    this.webStorageService.storeData("contrato", this.contrato);
    this.webStorageService.storeData("curriculum", this.curriculum);
    this.webStorageService.storeData("cursos", this.cursos);
    this.webStorageService.storeData("documentos", this.documentos);
    this.webStorageService.storeData("estudios", this.estudios);
    this.webStorageService.storeData("horario", this.horario);
    this.webStorageService.storeData("nomina", this.nomina);
    this.webStorageService.storeData("trayectoria", this.trayectoria);
  }

  webStorageOnDestroy(): void {
    this.webStorageService.clearStorage();
  }

  getEmpleado(): EmpleadoModel {
    return this.empleado;
  }

  setEmpleado(empleado: EmpleadoModel) {
    this.empleado = empleado;
  }
  
}
