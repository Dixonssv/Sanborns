import { Observable, from } from "rxjs";
import { Mapper } from "../../base/mapper";

export class ApiResponseMapper extends Mapper<any,  any> {
    override mapFrom(param: any): Observable<any> {
        return from<any>(param.body);
    }

    override mapTo(param: Observable<Object>) {
        throw new Error("Method not implemented.");
    }
    
}