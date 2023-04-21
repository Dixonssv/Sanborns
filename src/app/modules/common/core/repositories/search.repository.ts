import { Observable } from "rxjs";

export abstract class SearchRepository {
    abstract searchEmpleados(input:string): Observable<void>;
}