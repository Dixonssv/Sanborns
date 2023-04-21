import { Injectable } from "@angular/core";
import { UseCase } from "../base/use-case";
import { SearchRepository } from "../repositories/search.repository";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class SearchEmpleadosUseCase implements UseCase<string, void>{

    constructor(private searchRepository: SearchRepository) {

    }

    execute(params: string): Observable<void> {
        return this.searchRepository.searchEmpleados(params);
    }

}