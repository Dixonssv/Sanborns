import { EmpleadoModel } from "./empleado.model";

export interface Expediente {
    empleado:        EmpleadoModel;
    actas?:          any;
    contrato?:       any;
    curriculum?:     any;
    cursos?:         any;
    documentos?:     any;
    estudios?:       any;
    horario?:        any;
    nomina?:         any;
    trayectoria?:    any;
}