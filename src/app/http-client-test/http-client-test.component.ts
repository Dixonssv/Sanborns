import { Component } from '@angular/core';

import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-http-client-test',
  templateUrl: './http-client-test.component.html',
  styleUrls: ['./http-client-test.component.css']
})
export class HttpClientTestComponent {

  resultado: any;
  url = 'https://jsonplaceholder.typicode.com/posts';

  constructor (private http: HttpClient) {

  }

  ngOnInit() {
    //this.get();
  }

  get() {
    const req = this.http.get(this.url);
    
    req.subscribe(data => {this.resultado = data});
  }

  post() {
    this.http.post(this.url,
      {
        title: 'Título',
        body: 'Cuerpo',
        userId: 1
      }
      )
    .subscribe(data => {this.resultado = data});
  }

}
