import { Mapper } from "../../base/mapper";
import { EmpleadoModel } from "../empleado.model";
import { EmpleadoFormattedMapper } from "./empleado-formatted.mapper";


export class EmpleadoMapper extends Mapper<any, EmpleadoModel> {

    override mapFrom(param: any): EmpleadoModel {

        let formattedMapper: EmpleadoFormattedMapper = new EmpleadoFormattedMapper();

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
            numeroEmpleado: param.numeroEmpleado,
            nombre: param.nombre,
            formatted: formattedMapper.mapFrom(param)
        };
    }
    override mapTo(param: EmpleadoModel): any {
        throw new Error("Method not implemented.");
    }
    
}