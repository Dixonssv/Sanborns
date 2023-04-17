import { Observable } from 'rxjs';
import { EmpleadoModel } from '../domain/empleado.model';

export abstract class EmpleadoRepository {
    abstract getAllEmpleados(): Observable<EmpleadoModel>;
    abstract getEmpleados(query: string): Observable<EmpleadoModel>;
}