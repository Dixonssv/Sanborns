import { Injectable } from '@angular/core';
import { EmpleadoModel } from '../../models/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {

  private empleado:   any;

  private actas:      any;
  private contrato:   any;
  private curriculum: any;
  private cursos:     any;
  private documentos: any;
  private estudios:   any;
  private horario:    any;
  private nomina:     any;
  private trayectoria:any;

  constructor() { }

  getEmpleado(): EmpleadoModel {
    return this.empleado;
  }

  setEmpleado(empleado: EmpleadoModel) {
    this.empleado = empleado;
  }

  
}
