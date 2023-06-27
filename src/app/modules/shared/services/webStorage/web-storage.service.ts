import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor() { }

  getData(keyName: string): any {
    let value = localStorage.getItem(keyName);

    return value === null ? value : JSON.parse(value);
  }

  storeData(keyName: string, value: any) {
    localStorage.setItem(keyName, JSON.stringify(value));
    console.log(keyName + " stored as: " + localStorage.getItem(keyName));
  }

  clearStorage() {
    localStorage.clear();
  }
}

export declare interface WebStorageMethods {
  webStorageOnInit(): void;
  webStorageAfterInit(): void;
  webStorageOnDestroy(): void;
}
