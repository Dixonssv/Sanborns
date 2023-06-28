import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor() { }

  getData(keyName: string): any {
    let value = localStorage.getItem(keyName);

    value = value === null ? value : JSON.parse(value);

    //console.log(keyName + " got as: ");
    //console.log(value);
    return value;
  }

  storeData(keyName: string, value: any) {
    localStorage.setItem(keyName, JSON.stringify(value));
    console.log(keyName + " stored as: ");
    console.log(this.getData(keyName));
  }

  removeData(keyName: string) {
    localStorage.removeItem(keyName);
    console.log(keyName + ": removed");
  }

  clearStorage() {
    localStorage.clear();
  }
}

export declare interface WebStorageMethods {
  /**
   * @description Lógica de recuperación de datos.
   */
  webStorageOnInit(): void;

  /**
   * @description Lógica de almacenamiento de datos.
   */
  webStorageAfterInit(): void;

  /**
   * @description Lógica de liberacion de espacio.
   */
  webStorageOnDestroy(): void;
}
