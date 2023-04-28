import { Mapper } from "../../base/mapper";
import { EmpleadoModel } from "../empleado.model";


export class EmpleadoFormattedMapper extends Mapper<any, EmpleadoModel> {
    public override mapFrom(param: any): EmpleadoModel {

        return {
            claveCompania: param._formatted.claveCompania,
            compania: param._formatted.compania,
            claveArea: param._formatted.claveArea,
            area: param._formatted.area,
            claveUnidad: param._formatted.claveUnidad,
            unidad: param._formatted.unidad,
            claveDepartamento: param._formatted.claveDepartamento,
            departamento: param._formatted.departamento,
            clavePuesto: param._formatted.clavePuesto,
            puesto: param._formatted.puesto,
            numeroEmpleado: param._formatted.numeroEmpleado,
            nombre: param._formatted.nombre
        };
    }
    
    override mapTo(param: EmpleadoModel): any {
        throw new Error("Method not implemented.");
    }
    
}