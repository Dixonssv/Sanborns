export interface EmpleadoModel {
    claveCompania: number;
    compania: string;
    claveArea: number;
    area: string;
    claveUnidad: number;
    unidad: string;
    claveDepartamento: number;
    departamento: string;
    clavePuesto: number;
    puesto: string;
    numeroEmpleado: string;
    nombre: string;
    formatted?: EmpleadoModel;
}