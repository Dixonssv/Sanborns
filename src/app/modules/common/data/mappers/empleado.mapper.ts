import { Mapper } from "../../core/base/mapper";
import { EmpleadoModel } from "../../core/domain/empleado.model";


export class EmpleadoMapper extends Mapper<any, EmpleadoModel> {
    override mapFrom(param: any): EmpleadoModel {

        //console.log("Empleado mapper:");
        //console.log(param);

        return {
            claveCompania: param.claveCompania,
            compania: param.compania,
            claveArea: param.claveArea,
            area: param.area,
            claveUnidad: param.claveUnidad,
            unidad: param.unidad,
            claveDepartamento: param.claveDepartamento,
            departamento: param.departamento,
            clavePuesto: param.clavePuesto,
            puesto: param.puesto,
            numeroEmpleado: param._formatted.numeroEmpleado,
            nombre: param._formatted.nombre
        };
    }
    override mapTo(param: EmpleadoModel): any {
        throw new Error("Method not implemented.");
    }
    
}